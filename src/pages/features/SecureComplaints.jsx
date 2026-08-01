import { Shield } from 'lucide-react';
import FeaturePageTemplate from './FeaturePageTemplate';

export default function SecureComplaints() {
  return (
    <FeaturePageTemplate
      title="Secure Complaints"
      tagline="Protect citizen data with secure intake, authentication, and privacy safeguards."
      icon={Shield}
      badge="Privacy First"
      overview="Secure complaints protect both citizens and departments by validating identities, protecting personal data, and ensuring that every report is handled safely from the first submission onward."
      howItWorks={[
        'Citizens authenticate before filing a complaint to establish a verified profile.',
        'The report is encrypted and stored with controlled access permissions.',
        'Sensitive information remains protected while the department reviews the case.',
        'Every action is logged so the record remains secure and auditable.',
      ]}
      benefits={[
        'Encrypted storage',
        'Verified access',
        'Audit-ready records',
        'Privacy protection',
      ]}
      highlights={[
        'Secure identity verification',
        'Controlled access for officers and administrators',
        'Protected evidence and personal data handling',
      ]}
      useCases={[
        'Sensitive civic complaints',
        'Privacy protected service requests',
        'Official investigations and case review',
      ]}
      faqs={[
        {
          question: 'Who can access complaint information?',
          answer: 'Only authorized department members and the citizen who submitted the case can access protected details.',
        },
        {
          question: 'Is complaint data encrypted?',
          answer: 'Yes. All complaint records and attachments are encrypted both in transit and at rest.',
        },
      ]}
    />
  );
}
