import { MapPinned } from 'lucide-react';
import FeaturePageTemplate from './FeaturePageTemplate';

export default function LiveComplaintTracking() {
  return (
    <FeaturePageTemplate
      title="Live Complaint Tracking"
      tagline="Follow every complaint movement across departments in real time."
      icon={MapPinned}
      badge="Movement Tracking"
      overview="Live complaint tracking gives citizens and officers a real-time picture of how a case moves across departments, handoffs, and milestone stages from initial intake to resolution."
      howItWorks={[
        'Every handoff is logged as the complaint moves between departments.',
        'Citizens can see the most recent location and stage of the case.',
        'Officers receive a clear view of the next step in the workflow.',
        'Supervisors can quickly identify delays and improve turnaround times.',
      ]}
      benefits={[
        'Department workflow visibility',
        'Reduction in lost cases',
        'Clear handoff history',
        'Better coordination',
      ]}
      highlights={[
        'Live handoff and transfer history',
        'Department movement timeline',
        'Milestone-based updates for each stage',
      ]}
      useCases={[
        'Interdepartmental case transfers',
        'Escalated public service requests',
        'Operational workflow monitoring',
      ]}
      faqs={[
        {
          question: 'What does the live tracker show?',
          answer: 'It shows the current department, the latest status, and the full movement history of the case.',
        },
        {
          question: 'Can this help reduce delays?',
          answer: 'Yes. By making transfers and bottlenecks visible, teams can address delays more quickly.',
        },
      ]}
    />
  );
}
