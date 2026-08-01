import { BadgeCheck } from 'lucide-react';
import FeaturePageTemplate from './FeaturePageTemplate';

export default function ProofBasedResolution() {
  return (
    <FeaturePageTemplate
      title="Proof-Based Resolution"
      tagline="Support every closure with evidence, updates, and verified outcomes."
      icon={BadgeCheck}
      badge="Verified Closure"
      overview="Proof-based resolution helps departments close complaints with strong evidence, screenshots, photos, and formal notes so every resolution is traceable and accountable."
      howItWorks={[
        'The department reviews the complaint and collects evidence from the citizen or field team.',
        'The case is assessed against the original issue and any supporting documents.',
        'A verified outcome is posted with a final status and resolution note.',
        'The citizen can review the closure details and confirm the resolution.',
      ]}
      benefits={[
        'Evidence-backed outcomes',
        'Better accountability',
        'Clear closure records',
        'Improved trust',
      ]}
      highlights={[
        'Photo and video verification support',
        'Formal resolution reporting',
        'Traceable case closure history',
      ]}
      useCases={[
        'Field service completion',
        'Inspection and compliance cases',
        'Evidence-based service closure',
      ]}
      faqs={[
        {
          question: 'Can citizens upload proof too?',
          answer: 'Yes. Citizens can attach photos or videos that support the case and help departments verify the outcome.',
        },
        {
          question: 'What happens after closure?',
          answer: 'The case remains visible in the record with the final status and evidence for future reference.',
        },
      ]}
    />
  );
}
