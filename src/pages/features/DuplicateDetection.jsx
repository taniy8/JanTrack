import { SearchCheck } from 'lucide-react';
import FeaturePageTemplate from './FeaturePageTemplate';

export default function DuplicateDetection() {
  return (
    <FeaturePageTemplate
      title="Duplicate Detection"
      tagline="Prevent duplicate reports and keep complaint queues clean and efficient."
      icon={SearchCheck}
      badge="Smart Deduplication"
      overview="Duplicate detection identifies similar or repeated complaints and helps departments merge or avoid redundant work. This keeps workflow queues manageable and improves resolution efficiency."
      howItWorks={[
        'A new complaint is compared against existing cases using text and metadata similarity.',
        'Potential duplicates are flagged for review with a confidence score.',
        'Staff can merge or link the duplicate case to the original complaint.',
        'The system prevents double handling while preserving the full record.',
      ]}
      benefits={[
        'Less duplicate effort',
        'Cleaner case queues',
        'Higher operational efficiency',
        'Better analytics',
      ]}
      highlights={[
        'Similarity matching and duplicate alerts',
        'Queue management for repeated reports',
        'Case merge and linkage support',
      ]}
      useCases={[
        'Repeated service requests',
        'Neighborhood issue clustering',
        'High-volume complaint intake',
      ]}
      faqs={[
        {
          question: 'Can duplicate cases still be reviewed manually?',
          answer: 'Yes. Department staff can verify the suggestion and decide whether to merge or keep the reports separate.',
        },
        {
          question: 'Does this affect the original complaint record?',
          answer: 'No. The original case stays intact and duplicate findings are linked for easy review.',
        },
      ]}
    />
  );
}
