import { Step } from '../../../definition';
import { ComponentContext } from '../../../component-context';
import { CustomBadgeConfiguration } from '../../../designer-configuration';
import { BadgeExtension, StepContext } from '../../../designer-extension';
import { Badge, StepComponentView } from '../../component';
import { CustomSvgBadge } from './custom-svg-badge';
import { CustomSvgBadgeViewConfiguration } from './custom-svg-badge-view-configuration';

const DEFAULT_SIZE = 22;

export class CustomSvgBadgeExtension implements BadgeExtension {
	public static create(configuration: CustomBadgeConfiguration, index: number): CustomSvgBadgeExtension {
		return new CustomSvgBadgeExtension(configuration, index);
	}

	public readonly id: string;

	private readonly viewConfiguration: CustomSvgBadgeViewConfiguration;

	private constructor(
		private readonly configuration: CustomBadgeConfiguration,
		index: number
	) {
		this.id = `custom-svg-badge-${index}`;
		this.viewConfiguration = {
			svgUrl: configuration.svgUrl,
			size: configuration.size ?? DEFAULT_SIZE
		};
	}

	public createForStep(
		parentElement: SVGElement,
		_view: StepComponentView,
		stepContext: StepContext<Step>,
		componentContext: ComponentContext
	): Badge {
		return CustomSvgBadge.createForStep(parentElement, stepContext, componentContext, this.configuration, this.viewConfiguration);
	}

	public createForRoot = this.configuration.root
		? (parentElement: SVGElement, componentContext: ComponentContext): Badge => {
				return CustomSvgBadge.createForRoot(
					parentElement,
					componentContext,
					this.configuration,
					this.viewConfiguration
				);
			}
		: undefined;

	public readonly createStartValue = () => true;
}
