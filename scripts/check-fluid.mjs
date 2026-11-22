import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const browser = await chromium.launch({
  headless: true,
  args: ['--enable-webgl', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});

await mkdir('artifacts', { recursive: true });
const report = [];

try {
  for (const scenario of [
    { name: 'desktop', width: 1440, height: 900, mobile: false },
    { name: 'mobile', width: 390, height: 844, mobile: true },
  ]) {
    const page = await browser.newPage({
      viewport: { width: scenario.width, height: scenario.height },
      deviceScaleFactor: 1,
      isMobile: scenario.mobile,
      hasTouch: scenario.mobile,
    });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));

    const response = await page.goto('http://127.0.0.1:4173/', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });
    assert.equal(response?.status(), 200, scenario.name + ' homepage response');
    await page.locator('.fluid-hero').waitFor();
    assert.match(await page.locator('h1').first().innerText(), /在精确与想象/);
    assert.equal(await page.locator('.fluid-hero-canvas').count(), 1);
    assert.equal(await page.locator('a[href="/blog/"]').count() > 0, true);

    await page.waitForTimeout(1400);
    await page.screenshot({ path: 'artifacts/' + scenario.name + '-fluid-home.png' });

    if (scenario.mobile) {
      // Previous implementation appeared colorful immediately but its ink
      // dissolved after a few seconds. Verify the sustained ambient scene.
      await page.waitForTimeout(6500);
      await page.screenshot({ path: 'artifacts/mobile-fluid-ambient-8s.png' });
    }

    if (scenario.mobile) {
      const hero = page.locator('.fluid-hero');
      assert.equal(await hero.evaluate(el => getComputedStyle(el).touchAction), 'pan-y');
      await page.getByRole('button', { name: '开启手指涂色' }).click();
      assert.equal(await hero.evaluate(el => getComputedStyle(el).touchAction), 'none');
      const before = Number(await hero.getAttribute('data-fluid-interactions') || '0');
      const cdp = await page.context().newCDPSession(page);
      const startX = Math.round(scenario.width * 0.78);
      const startY = Math.round(scenario.height * 0.48);
      await cdp.send('Input.dispatchTouchEvent', {
        type: 'touchStart', touchPoints: [{ x: startX, y: startY }],
      });
      for (let i = 1; i <= 12; i++) {
        await cdp.send('Input.dispatchTouchEvent', {
          type: 'touchMove',
          touchPoints: [{ x: startX - i * 10, y: startY + Math.round(Math.sin(i / 3) * 45) }],
        });
        await page.waitForTimeout(25);
      }
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      await page.waitForTimeout(250);
      const after = Number(await hero.getAttribute('data-fluid-interactions') || '0');
      assert.ok(after - before >= 5, 'Mobile drag must generate multiple dye/velocity splats, got ' + (after - before));
      await page.screenshot({ path: 'artifacts/mobile-fluid-drag.png' });
      await page.getByRole('button', { name: /结束互动/ }).click();
      assert.equal(await hero.evaluate(el => getComputedStyle(el).touchAction), 'pan-y');
      report.push({ touchDragSplats: after - before, scrollRestored: true });
      await cdp.detach();
    }

    const mode = await page.locator('button:has-text("关闭动态效果")').count()
      ? 'interactive'
      : 'fallback';
    if (mode === 'interactive') {
      await page.getByRole('button', { name: '关闭动态效果' }).click();
      assert.equal(await page.locator('.fluid-hero-canvas').evaluate(el => el.style.opacity), '0');
      await page.getByRole('button', { name: '开启动态效果' }).click();
    }

    await page.goto('http://127.0.0.1:4173/blog/', { waitUntil: 'domcontentloaded' });
    assert.equal(await page.getByText('研究与写作').count() > 0, true);
    await page.goto('http://127.0.0.1:4173/blog/ai-masks-ordinariness-human-distance/', {
      waitUntil: 'domcontentloaded',
    });
    assert.match(await page.locator('h1').first().innerText(), /当 AI 掩盖了平庸/);

    assert.deepEqual(errors, [], scenario.name + ' uncaught browser errors');
    report.push({ scenario: scenario.name, mode, errors });
    await page.close();
  }
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
