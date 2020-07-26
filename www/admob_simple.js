var admobid = {};

// TODO: replace the following ad units with your own
if( /(android)/i.test(navigator.userAgent) ) {
  admobid = { // for Android
    banner: 'ca-app-pub-8256871331195390/3883259400',
    interstitial: 'ca-app-pub-8256871331195390/3952795837',
  };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
  admobid = { // for iOS
    banner: 'ca-app-pub-8256871331195390/3883259400',
    interstitial: 'ca-app-pub-8256871331195390/3952795837',
  };
} else {
  admobid = { // for Windows Phone, deprecated
    banner: '',
    interstitial: '',
    rewardvideo: '',
  };
}

function initApp() {
  if (! AdMob ) { alert( 'admob plugin not ready' ); return; }

  // this will create a banner on startup
  AdMob.createBanner( {
    adId: admobid.banner,
    position: AdMob.AD_POSITION.BOTTOM_CENTER,
    overlap: false,
    offsetTopBar: false,
    bgColor: 'black',
    autoShow: true
  } );

  // this will load a full screen ad on startup
  AdMob.prepareInterstitial({
    adId: admobid.interstitial,
    isTesting: false, // TODO: remove this line when release
    autoShow: false
  });
}
document.addEventListener('onAdDismiss', function(e){
    AdMob.prepareInterstitial({
    adId: admobid.interstitial,
    isTesting: false, // TODO: remove this line when release
    autoShow: false
  });
});