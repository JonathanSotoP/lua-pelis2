// 🛡️ Service Worker Anti-Ads — LuaPelis
// Intercepta requests de dominios publicitarios conocidos y los bloquea

const AD_DOMAINS = [
  'doubleclick.net',
  'googlesyndication.com',
  'googletagmanager.com',
  'googletagservices.com',
  'adservice.google.com',
  'pagead2.googlesyndication.com',
  'tpc.googlesyndication.com',
  'adnxs.com',
  'adsystem.amazon.com',
  'advertising.com',
  'adbrite.com',
  'adcolony.com',
  'adform.net',
  'adhigh.net',
  'adingo.jp',
  'adition.com',
  'adjuggler.net',
  'adkernel.com',
  'adlegend.com',
  'admanager.google.com',
  'admob.com',
  'adnetwork.net',
  'adroll.com',
  'ads-twitter.com',
  'adsafeprotected.com',
  'adscale.de',
  'adsymptotic.com',
  'adtech.de',
  'adtechus.com',
  'adtlgc.com',
  'adultadworld.com',
  'advangelists.com',
  'adventori.fr',
  'adverline.com',
  'adverticum.net',
  'advertising.com',
  'advertstream.com',
  'adyoulike.com',
  'affiliates.net',
  'akamaihd.net',
  'amazon-adsystem.com',
  'analytics.google.com',
  'appnexus.com',
  'banner.net',
  'bidswitch.net',
  'bounceexchange.com',
  'brainlyads.com',
  'buysellads.com',
  'casalemedia.com',
  'clickbank.net',
  'clickbooth.com',
  'cpx.to',
  'criteo.com',
  'criteo.net',
  'demdex.net',
  'dotomi.com',
  'doubleverify.com',
  'emxdgt.com',
  'everesttech.net',
  'exoclick.com',
  'exponential.com',
  'facebook.net',
  'fbcdn.net',
  'flashtalking.com',
  'fwmrm.net',
  'gemius.pl',
  'gumgum.com',
  'hit.gemius.pl',
  'iasds01.com',
  'ib.adnxs.com',
  'idx.liadm.com',
  'im-apps.net',
  'impact-ad.jp',
  'indexww.com',
  'iqm.com',
  'justpremium.com',
  'lijit.com',
  'liveintent.com',
  'liveintentmail.com',
  'loopme.com',
  'media.net',
  'mediabong.net',
  'mediaplex.com',
  'minutemedia.com',
  'mopub.com',
  'moatads.com',
  'narrative.io',
  'netsolads.com',
  'netseer.com',
  'newsinc.com',
  'nexac.com',
  'openx.com',
  'openx.net',
  'outbrain.com',
  'owneriq.net',
  'pixfuture.com',
  'platform.twitter.com',
  'plyr.io',
  'popads.net',
  'popcash.net',
  'pornhub.com',
  'postrelease.com',
  'pro-market.net',
  'pubmatic.com',
  'pulse.ebx.sh',
  'quantcast.com',
  'quantserve.com',
  'revcontent.com',
  'rfihub.com',
  'richrelevance.com',
  'rlcdn.com',
  'rubiconproject.com',
  'scorecardresearch.com',
  'serving-sys.com',
  'sharethrough.com',
  'simpli.fi',
  'smaato.com',
  'smartadserver.com',
  'smartclip.net',
  'sonobi.com',
  'spotxchange.com',
  'springserve.com',
  'stackadapt.com',
  'steelhousemedia.com',
  'strikead.com',
  'synacor.com',
  'taboola.com',
  'tapad.com',
  'telaria.com',
  'the-ozone-project.com',
  'theadex.com',
  'thebrighttag.com',
  'tidaltv.com',
  'trafficjunky.net',
  'trafficleader.com',
  'trafficstars.com',
  'triplelift.com',
  'truedata.co',
  'trustarc.com',
  'turn.com',
  'tvpixel.com',
  'undertone.com',
  'unrulymedia.com',
  'valueclick.com',
  'verizonmedia.com',
  'vibrantmedia.com',
  'vidazoo.com',
  'videohub.tv',
  'vimeopro.com',
  'vindico.com',
  'visual.ly',
  'w55c.net',
  'weborama.fr',
  'xaxis.com',
  'yieldmo.com',
  'yldbt.com',
  'zemanta.com',
  'zergnet.com',
  // Dominios de tracking/telemetría
  'hotjar.com',
  'mouseflow.com',
  'fullstory.com',
  'logrocket.com',
  'segment.com',
  'mixpanel.com',
  'amplitude.com',
  'heap.io',
];

function isAdRequest(url) {
  try {
    const hostname = new URL(url).hostname;
    return AD_DOMAINS.some(domain =>
      hostname === domain || hostname.endsWith('.' + domain)
    );
  } catch {
    return false;
  }
}

self.addEventListener('install', (e) => {
  self.skipWaiting();
  console.log('🛡️ SW anti-ads instalado');
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
  console.log('🛡️ SW anti-ads activo');
});

self.addEventListener('fetch', (e) => {
  const url = e.request.url;

  // Bloquear dominios de anuncios
  if (isAdRequest(url)) {
    console.warn('🛡️ SW bloqueado:', new URL(url).hostname);
    e.respondWith(new Response('', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    }));
    return;
  }

  // Todo lo demás pasa normalmente
  e.respondWith(fetch(e.request).catch(() =>
    new Response('', { status: 503 })
  ));
});
