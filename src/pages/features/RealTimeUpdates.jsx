import { BellRing } from 'lucide-react';
import FeaturePageTemplate from './FeaturePageTemplate';

export default function RealTimeUpdates() {
  return (
    <FeaturePageTemplate
      title="Real-Time Updates"
      tagline="Keep citizens informed the moment a complaint changes status."
      icon={BellRing}
      badge="Live Notifications"
      overview="Real-time updates ensure that citizens receive timely alerts when a complaint moves to a new stage. Notifications help reduce uncertainty and improve trust by keeping everyone aligned throughout the process."
      howItWorks={[
        'The system detects a new milestone such as assignment or escalation.',
        'A notification is pushed to the citizen and department contacts.',
        'Updates appear in the dashboard and can be shared by email or SMS.',
        'The public can review the latest status without contacting the department directly.',
      ]}
      benefits={[
        'Instant alerts',
        'Fewer follow-up calls',
        'Improved communication',
        'Higher customer confidence',
      ]}
      highlights={[
        'Automated email and SMS alerts',
        'Live dashboard refresh for new milestones',
        'Clear priority and escalation messaging',
      ]}
      useCases={[
        'Urgent public safety reports',
        'Road and drainage interruptions',
        'Citizen service follow-up messaging',
      ]}
      faqs={[
        {
          question: 'Can citizens choose their preferred notification channel?',
          answer: 'Yes. Updates can be delivered through the app and optionally by email or SMS.',
        },
        {
          question: 'How quickly are alerts sent?',
          answer: 'Notifications are triggered immediately when the case enters a new stage or receives action.',
        },
      ]}
    />
  );
}
