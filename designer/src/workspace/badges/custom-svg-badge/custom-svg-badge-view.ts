import { Dom } from '../../../core/dom';
import { BadgeView } from '../../component';
import { CustomSvgBadgeViewConfiguration } from './custom-svg-badge-view-configuration';

export class CustomSvgBadgeView implements BadgeView {
	public static create(parent: SVGElement, cfg: CustomSvgBadgeViewConfiguration, tooltip: string): CustomSvgBadgeView {
		const g = Dom.svg('g', {
			class: 'sqd-custom-svg-badge'
		});

		const title = Dom.svg('title');
		title.textContent = tooltip;
		g.appendChild(title);

		const image = Dom.svg('image', {
			href: cfg.svgUrl
		});
		Dom.attrs(image, {
			x: 0,
			y: 0,
			width: cfg.size,
			height: cfg.size
		});
		g.appendChild(image);

		parent.appendChild(g);
		return new CustomSvgBadgeView(parent, g, title, cfg.size, cfg.size);
	}

	public constructor(
		private readonly parent: SVGElement,
		public readonly g: SVGGElement,
		private readonly titleElement: SVGTitleElement,
		public readonly width: number,
		public readonly height: number
	) {}

	public setTooltip(tooltip: string) {
		this.titleElement.textContent = tooltip;
	}

	public destroy() {
		this.parent.removeChild(this.g);
	}
}
