import type { Page } from '@/payload-types'

import { Banners } from './Banners'
import { CategoryGrid } from './CategoryGrid'
import { CompanyDetails } from './CompanyDetails'
import { CtaBand } from './CtaBand'
import { ContactSection } from './ContactSection'
import { CtaBanner } from './CtaBanner'
import { EditorialHero } from './EditorialHero'
import { FeatureStrip } from './FeatureStrip'
import { HeroSlider } from './HeroSlider'
import { IngredientSpotlight } from './IngredientSpotlight'
import { Manifesto } from './Manifesto'
import { Marquee } from './Marquee'
import { PageHero } from './PageHero'
import { PillarIndex } from './PillarIndex'
import { Pillars } from './Pillars'
import { ProductCarousel } from './ProductCarousel'
import { ProductGrid } from './ProductGrid'
import { ProductSteps } from './ProductSteps'
import { RangeGrid } from './RangeGrid'
import { RichTextSection } from './RichTextSection'
import { SplitHero } from './SplitHero'
import { Statement } from './Statement'
import { SplitContent } from './SplitContent'
import { StatementCta } from './StatementCta'
import { TaglineStrip } from './TaglineStrip'
import { TreatmentCards } from './TreatmentCards'

type Block = Page['layout'][number]

const components: { [K in Block['blockType']]: React.ComponentType<Extract<Block, { blockType: K }>> } = {
  banners: Banners,
  heroSlider: HeroSlider,
  pageHero: PageHero,
  featureStrip: FeatureStrip,
  rangeGrid: RangeGrid,
  categoryGrid: CategoryGrid,
  splitContent: SplitContent,
  pillars: Pillars,
  productSteps: ProductSteps,
  productGrid: ProductGrid,
  ctaBanner: CtaBanner,
  contactSection: ContactSection,
  richText: RichTextSection,
  companyDetails: CompanyDetails,
  editorialHero: EditorialHero,
  marquee: Marquee,
  manifesto: Manifesto,
  pillarIndex: PillarIndex,
  productCarousel: ProductCarousel,
  ingredientSpotlight: IngredientSpotlight,
  statementCta: StatementCta,
  splitHero: SplitHero,
  taglineStrip: TaglineStrip,
  statement: Statement,
  ctaBand: CtaBand,
  treatmentCards: TreatmentCards,
}

export function RenderBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        const Component = components[block.blockType] as React.ComponentType<Block>
        return Component ? <Component key={block.id ?? i} {...block} /> : null
      })}
    </>
  )
}
