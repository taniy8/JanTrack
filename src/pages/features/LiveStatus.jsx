import { Activity } from 'lucide-react';
import FeaturePageTemplate from './FeaturePageTemplate';

export default function LiveStatus() {
  return (
    <FeaturePageTemplate
      title="Live Status"
      tagline="View the exact stage of every complaint in one clear dashboard."
      icon={Activity}
      badge="Live Dashboard"
      overview="Live status provides an always-up-to-date overview of where each complaint is within the workflow. It helps citizens, officers, and supervisors understand the current stage at a glance."
      howItWorks={[
        'A complaint enters the system with a current stage label.',
        'Each action updates the dashboard in real time.',
        'Citizens can see whether work is pending, in progress, or resolved.',
        'Supervisors can identify bottlenecks and improve response times.',
      ]}
      benefits={[
        'Clear case stages',
        'Improved oversight',
        'Fewer manual checks',
        'Better service coordination',
      ]}
      highlights={[
        'Instant stage tracking',
        'Pending action visibility',
        'Resolution progress indicators',
      ]}
      useCases={[
        'Department performance dashboards',
        'Citizen-facing service tracking',
        'Supervisor issue monitoring',
      ]}
      faqs={[
        {
          question: 'Does the dashboard update automatically?',
          answer: 'Yes. New actions immediately refresh the case status view for all stakeholders.',
        },
        {
          question: 'Can this view be shared across departments?',
          answer: 'Yes. The live status layer is designed to support cross-department visibility and coordination.',
        },
      ]}
    />
  );
}
