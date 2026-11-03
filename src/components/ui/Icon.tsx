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

import type { IconName } from '@/fields/icon'

const icons: Record<IconName, LucideIcon> = {
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
}

export function Icon({ name, className }: { name?: string | null; className?: string }) {
  const Component = icons[(name as IconName) ?? 'sparkles'] ?? Sparkles
  return <Component className={className} aria-hidden strokeWidth={1.5} />
}
