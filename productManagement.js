const tokenizationSpecification = {
    type: 'PAYMENT_GATEWAY',
    parameters: {
        gateway: 'example',
        gatewayMerchantId: 'gatewayMerchantId',
    },
};

const cardPaymentMethod = {
    type: 'CARD',
    tokenizationSpecification: tokenizationSpecification,
    parameters: {
        allowedCardNetworks: ['VISA', 'MASTERCARD'],
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
    },
};


const googlePayConfiguration = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [cardPaymentMethod],
};

let googlePayClient;

function onGooglePayLoaded() {
    googlePayClient = new google.payments.api.PaymentsClient({
        environment: 'TEST',
    });

    googlePayClient.isReadyToPay(googlePayConfiguration)
        .then(response => {
            if (response.result) {
                createAndAddButton();
            } else {
                console.error('Google Pay is not ready.');
            }
        })
        .catch(error => console.error('isReadyToPay error:', error));
}

function createAndAddButton() {
    const googlePayButton = googlePayClient.createButton({
        onClick: onGooglePayButtonClicked,
    });

    document.getElementById('googlePayContainer').appendChild(googlePayButton);
}

function onGooglePayButtonClicked() {
    const paymentDataRequest = {
        ...googlePayConfiguration,
    };
    paymentDataRequest.merchantInfo = {
        merchantId: 'BCR2DN4TY2EKRWJZ', // Replace with your actual merchant ID
        merchantName: 'Tutorials online',
    };

   
    paymentDataRequest.transactionInfo = {
        totalPriceStatus: 'FINAL',
        totalPrice: '100.00', // Set the actual total price here
        currencyCode: 'INR', // Set the currency code
        countryCode: 'IN'
    };

    // paymentDataRequest.callbackIntents = ['PAYMENT_AUTHORIZATION'];

    // const paymentOptions = {
    //     request: paymentDataRequest,
    //     onPaymentResponse: onPaymentResponseReceived,
    //     onCancel: onCancel,
    //     onError: onError,
    // };

    googlePayClient.loadPaymentData(paymentDataRequest)
    .then(paymentData => processPaymentpaymentData(paymentData))
    .catch(error => console.error('loadPyamentData error:', error));
}

// function onPaymentResponseReceived(paymentResponse) {
//     // Handle the payment response, e.g., send it to your server for processing
//     console.log('Payment response:', paymentResponse);
// }

// function onCancel() {
//     // Handle the cancellation of the payment process
//     console.log('Payment cancelled');
// }

// function onError(error) {
//     // Handle errors during the payment process
//     console.error('Payment error:', error);
// }
