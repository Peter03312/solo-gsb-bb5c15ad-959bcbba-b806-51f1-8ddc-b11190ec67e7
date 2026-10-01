import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { CalibStatusChip } from '../../components/CalibStatusChip';

/** 去掉 React SSR 在文本节点与插值之间插入的注释分隔符，便于断言整段文案 */
const plain = (html: string) => html.replace(/<!-- -->/g, '');

describe('工作区校准状态标识（只读已提交快照）', () => {
  it('未提交校准（含确认改用原始 B 时间）时显示未校准', () => {
    const html = renderToString(<CalibStatusChip applied={null} />);
    expect(html).toContain('calib-chip off');
    expect(plain(html)).toContain('使用原始 B 时间');
    expect(plain(html)).not.toContain('已校准');
  });

  it('已提交校准时显示快照中的启用锚点数', () => {
    const html = renderToString(<CalibStatusChip applied={{ anchors: 5 }} />);
    expect(html).toContain('calib-chip on');
    expect(plain(html)).toContain('✓ 时间轴已校准（5 锚点）');
    expect(html).toContain('5 个锚点 · 分段线性映射');
  });

  it('显示内容完全由已提交快照决定：快照不变则渲染不变，快照不同则锚点数不同', () => {
    // 重新校准页里的草稿（锚点勾选 / 筛选参数）不是该组件的输入，
    // 预览计算中、计算失败或取消返回时快照保持不变，标识也就不变
    const committed = { anchors: 3 };
    const html1 = renderToString(<CalibStatusChip applied={committed} />);
    const html2 = renderToString(<CalibStatusChip applied={committed} />);
    expect(html2).toBe(html1);
    expect(plain(html1)).toContain('3 锚点');
    expect(plain(html1)).not.toContain('5 锚点');
    const updated = renderToString(<CalibStatusChip applied={{ anchors: 7 }} />);
    expect(plain(updated)).toContain('7 锚点');
    expect(plain(updated)).not.toContain('3 锚点');
  });
});
