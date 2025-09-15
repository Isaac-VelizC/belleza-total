import HairStrandsIcon from './hair-strands.astro';
import HairDryerIcon from './hair-dryer.astro';
import ScissorsIcon from './scissors.astro';
import PolishIcon from './polish.astro';
import ArrowRight from "./arrow-right.astro";
import PlantIcon from './plant.astro';
import PaintIcon from './paint.astro';

type IconComponent = (props: Record<string, any>) => any;

interface IconDict {
  [key: string]: IconComponent;
}

export const iconDict: IconDict = {
  hairStrands: HairStrandsIcon,
  hairDryer: HairDryerIcon,
  polish: PolishIcon,
  scissors: ScissorsIcon,
  paint: PaintIcon,
  plant: PlantIcon,
  arrowRight: ArrowRight
  // otros iconos
};
