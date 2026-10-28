import {
  Atom,
  Ban,
  Check,
  Droplet,
  Eye,
  FlaskConical,
  Flower2,
  Gem,
  Heart,
  Leaf,
  type LucideIcon,
  Shield,
  Sparkles,
  Star,
  UserRound,
  Waves,
  Wind,
} from 'lucide-react'

const icons = {
  leaf: Leaf,
  star: Star,
  flask: FlaskConical,
  eye: Eye,
  heart: Heart,
  droplet: Droplet,
  sparkles: Sparkles,
  shield: Shield,
  waves: Waves,
  atom: Atom,
  user: UserRound,
  check: Check,
  flower: Flower2,
  hair: Wind,
  gem: Gem,
  ban: Ban,
} satisfies Record<string, LucideIcon>

/** Valid values for the `icon` fields in src/content/*.json */
export type IconName = keyof typeof icons

export function Icon({ name, className }: { name?: string | null; className?: string }) {
  const Component = icons[(name as IconName) ?? 'sparkles'] ?? Sparkles
  return <Component className={className} aria-hidden strokeWidth={1.5} />
}
