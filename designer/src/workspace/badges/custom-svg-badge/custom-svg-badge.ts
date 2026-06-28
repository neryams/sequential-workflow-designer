import { ComponentContext } from '../../../component-context';
import { CustomBadgeConfiguration } from '../../../designer-configuration';
import { StepContext } from '../../../designer-extension';
import { Badge } from '../../component';
import { CustomSvgBadgeView } from './custom-svg-badge-view';
import { CustomSvgBadgeViewConfiguration } from './custom-svg-badge-view-configuration';

export class CustomSvgBadge implements Badge {
	public static createForStep(
		parentElement: SVGElement,
		stepContext: StepContext,
		componentContext: ComponentContext,
		configuration: CustomBadgeConfiguration,
		viewConfiguration: CustomSvgBadgeViewConfiguration
	): CustomSvgBadge {
		const getTooltip = () => {
			if (!configuration.step) {
				return null;
			}
			return configuration.step(stepContext.step, stepContext.parentSequence, componentContext.getDefinition());
		};
		return new CustomSvgBadge(parentElement, getTooltip, viewConfiguration);
	}

	public static createForRoot(
		parentElement: SVGElement,
		componentContext: ComponentContext,
		configuration: CustomBadgeConfiguration,
		viewConfiguration: CustomSvgBadgeViewConfiguration
	): CustomSvgBadge {
		const getTooltip = () => {
			if (!configuration.root) {
				return null;
			}
			return configuration.root(componentContext.getDefinition());
		};
		return new CustomSvgBadge(parentElement, getTooltip, viewConfiguration);
	}

	public view: CustomSvgBadgeView | null = null;

	private constructor(
		private readonly parentElement: SVGElement,
		private readonly getTooltip: () => string | null,
		private readonly viewConfiguration: CustomSvgBadgeViewConfiguration
	) {}

	public update(result: unknown): unknown {
		const tooltip = this.getTooltip();

		if (!tooltip) {
			if (this.view) {
				this.view.destroy();
				this.view = null;
			}
		} else if (!this.view) {
			this.view = CustomSvgBadgeView.create(this.parentElement, this.viewConfiguration, tooltip);
		} else {
			this.view.setTooltip(tooltip);
		}

		return result;
	}

	public resolveClick(): null {
		return null;
	}
}
