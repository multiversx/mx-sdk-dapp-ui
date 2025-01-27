let notificationId = 0;

function showNotification() {
  const toastData = {
    success: {
      id: notificationId,
      icon: 'check',
      hasCloseButton: true,
      title: 'Transaction successful',
      iconClassName: 'success',
    },
    pending: {
      id: notificationId,
      icon: 'hourglass',
      hasCloseButton: false,
      title: 'Processing transaction',
      iconClassName: 'warning',
    },
    fail: {
      id: notificationId,
      icon: 'times',
      title: 'Transaction failed',
      hasCloseButton: true,
      iconClassName: 'danger',
    },
    invalid: {
      id: notificationId,
      icon: 'ban',
      title: 'Transaction invalid',
      hasCloseButton: true,
      iconClassName: 'warning',
    },
    timedOut: {
      id: notificationId,
      icon: 'times',
      title: 'Transaction timed out',
      hasCloseButton: true,
      iconClassName: 'warning',
    },
  };

  const statuses = ['success', 'pending', 'fail', 'invalid', 'timedOut', 'pending', 'signed', 'sent', 'executed', 'notExecuted', 'rewardReverted'];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const progressStatuses = ['pending', 'signed', 'sent', 'executed', 'notExecuted', 'rewardReverted'];

  const newToast = document.createElement('transaction-toast');
  newToast.toastDataState = progressStatuses.includes(status) ? toastData['pending'] : toastData[status];

  if (progressStatuses.includes(status)) {
    newToast.transactionProgressState = {
      currentRemaining: 100,
    };

    const intervalId = setInterval(() => {
      if (newToast.transactionProgressState.currentRemaining > 0) {
        newToast.transactionProgressState = {
          ...newToast.transactionProgressState,
          currentRemaining: newToast.transactionProgressState.currentRemaining - 1,
        };
      } else {
        clearInterval(intervalId);
      }
    }, 200);
  }

  newToast.processedTransactionsStatus = '0 / 1 transactions processed';
  newToast.toastId = notificationId.toString();
  newToast.transactions = [{ hash: 'erd1...8ctr', status: 'success' }];

  const transactionListElement = document.getElementById('toast-list');
  if (transactionListElement) {
    transactionListElement.appendChild(newToast);
  }

  notificationId++;
}
