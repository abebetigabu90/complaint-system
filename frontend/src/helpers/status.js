export const getStatusDisplay = (status) => {
  const statusMap = {
    'submitted': '📋 Submitted',
    'inProgress': '🔄 In Progress',
    'resolved': '✅ Resolved',
    'pending_confirmation': '✅ Resolved - Please confirm if satisfied',
    'closed': '🏁 Closed',
    'reopened': '🔁 Reopened - Under review again'
  };
  return statusMap[status] || status;
};

export const getStatusDescription = (status) => {
  const descriptionMap = {
    'submitted': 'Your complaint has been received and is waiting for review.',
    'inProgress': 'Our team is currently investigating your complaint.',
    'resolved': 'Your complaint has been resolved. Please check the resolution details.',
    'pending_confirmation': 'We\'ve resolved your complaint. Please confirm if you\'re satisfied with the solution.',
    'closed': 'This complaint has been successfully closed and completed.',
    'reopened': 'Your complaint has been reopened for further investigation.'
  };
  return descriptionMap[status] || '';
};