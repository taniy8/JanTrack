import { ShieldCheck } from 'lucide-react';
import FeaturePageTemplate from './FeaturePageTemplate';

export default function TransparentTracking() {
  return (
    <FeaturePageTemplate
      title="Transparent Tracking"
      tagline="Monitor every complaint with complete transparency from submission to resolution."
      icon={ShieldCheck}
      badge="Citizen Visibility"
      overview="Transparent tracking gives citizens a clear view of each case as it moves through the civic workflow. Departments can share status updates, attach evidence, and keep the public informed without missing a step."
      howItWorks={[
        'A citizen submits a complaint with a unique reference number.',
        'The system routes the request to the relevant department and records the handoff.',
        'Each milestone is updated in real time so citizens can follow progress.',
        'The case closes only after a verified resolution is posted for review.',
      ]}
      benefits={[
        'Real-time monitoring',
        'Department accountability',
        'Citizen transparency',
        'Faster response',
      ]}
      highlights={[
        'Live case timeline and milestones',
        'Department status updates and ownership history',
        'Resolution notes and evidence archive',
      ]}
      useCases={[
        'Public works tracking for roads and drainage',
        'Water service and sanitation case visibility',
        'Department-level performance tracking',
      ]}
      faqs={[
        {
          question: 'Can citizens see every department handoff?',
          answer: 'Yes. The timeline records each handoff and update so the full journey remains visible.',
        },
        {
          question: 'Does this feature support evidence sharing?',
          answer: 'Yes. Departments can upload supporting documents and status notes to strengthen accountability.',
        },
      ]}
    />
  );
}
