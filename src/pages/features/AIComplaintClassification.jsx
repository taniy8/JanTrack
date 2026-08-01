import { BrainCircuit } from 'lucide-react';
import FeaturePageTemplate from './FeaturePageTemplate';

export default function AIComplaintClassification() {
  return (
    <FeaturePageTemplate
      title="AI Complaint Classification"
      tagline="Route each complaint to the right department with intelligent classification."
      icon={BrainCircuit}
      badge="Smart Routing"
      overview="AI complaint classification analyzes incoming reports and assigns them to the most relevant department based on content, location, and issue type. This reduces delays and improves consistency in triage."
      howItWorks={[
        'The incoming complaint is analyzed for issue type, urgency, and key terms.',
        'The system maps the report to the most likely department or service team.',
        'The case is automatically prepared for review and assignment.',
        'Human operators can verify the route and make adjustments as needed.',
      ]}
      benefits={[
        'Faster routing',
        'Lower manual effort',
        'Higher assignment accuracy',
        'Quicker response',
      ]}
      highlights={[
        'Automatic categorization of new reports',
        'Context-aware department mapping',
        'Confidence scoring for routing suggestions',
      ]}
      useCases={[
        'Municipal service triage',
        'Multi-department civic intake',
        'Priority and urgency routing',
      ]}
      faqs={[
        {
          question: 'Can staff override AI suggestions?',
          answer: 'Yes. Supervisors can review and adjust the recommended assignment before the case proceeds.',
        },
        {
          question: 'How reliable is the classification?',
          answer: 'The system uses confidence-based logic and continuously improves as it learns from department feedback.',
        },
      ]}
    />
  );
}
