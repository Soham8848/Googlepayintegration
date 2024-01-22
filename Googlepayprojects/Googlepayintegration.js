/** Launches payment request flow when user taps on buy button. */
function onBuyClicked() {
    if (!window.PaymentRequest) {
      console.log('Web payments are not supported in this browser.');
      return;
    }
  
    // Create supported payment method.
    const supportedInstruments = [
      {
        supportedMethods: ['https://tez.google.com/pay'],
        data: {
          pa: 'merchant-vpa@xxx',
          pn: 'Merchant Name',
          tr: '1234ABCD',  // Your custom transaction reference ID
          url: 'https://url/of/the/order/in/your/website',
          mc: '1234', //Your merchant category code
          tn: 'Purchase in Merchant',
        },
      }
    ];
  
    // Create order detail data.
    const details = {
      total: {
        label: 'Total',
        amount: {
          currency: 'INR',
          value: '10.01', // sample amount
        },
      },
      displayItems: [{
        label: 'Original Amount',
        amount: {
          currency: 'INR',
          value: '10.01',
        },
      }],
    };
  
    // Create payment request object.
    let request = null;
    try {
      request = new PaymentRequest(supportedInstruments, details);
    } catch (e) {
      console.log('Payment Request Error: ' + e.message);
      return;
    }
    if (!request) {
      console.log('Web payments are not supported in this browser.');
      return;
    }
  
    var canMakePaymentPromise = checkCanMakePayment(request);
    canMakePaymentPromise
        .then((result) => {
          showPaymentUI(request, result);
        })
        .catch((err) => {
          console.log('Error calling checkCanMakePayment: ' + err);
        });
  }