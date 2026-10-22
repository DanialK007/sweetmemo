export type Language = "my" | "en";

export interface Translations {
  // Navigation & Common
  navHome: string;
  navTemplates: string;
  navMoments: string;
  navSignIn: string;
  navSignOut: string;
  navMakePage: string;
  navProfile: string;

  // Footer
  footerTagline: string;
  footerFindMoment: string;

  // Home - Hero
  heroBadge: string;
  heroTitlePrefix: string;
  heroTitleKeep: string;
  heroSubtitle: string;
  heroFindTemplate: string;
  heroYourMoments: string;
  heroTagline: string;
  heroCardBadge: string;
  heroCardTitle: string;
  heroCardDesc: string;
  heroCardLove: string;

  // Home - Steps
  stepsBadge: string;
  stepsTitle: string;
  stepsSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;

  // Home - Featured
  featuredBadge: string;
  featuredTitle: string;
  featuredSubtitle: string;
  featuredBrowseAll: string;
  exploreDesign: string;

  // Home - Testimonials
  testimonialsBadge: string;
  testimonialsTitle: string;
  testimonial1Quote: string;
  testimonial1Author: string;
  testimonial1City: string;
  testimonial2Quote: string;
  testimonial2Author: string;
  testimonial2City: string;
  testimonial3Quote: string;
  testimonial3Author: string;
  testimonial3City: string;

  // Home - CTA
  ctaBadge: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;

  // Templates page
  templatesBadge: string;
  templatesTitle: string;
  templatesSubtitle: string;
  templatesCountSuffix: string;
  templatesEmptyTitle: string;
  templatesEmptyDesc: string;
  catAll: string;
  catLoveNote: string;
  catAnniversary: string;
  catBirthday: string;
  catWedding: string;
  catFriendship: string;
  catMemory: string;

  // Design page
  designAllTemplates: string;
  designPreviewMockup: string;
  designMadeForYou: string;
  designWithLove: string;
  designTemplatePrice: string;
  designNoSubs: string;
  designPersonalizedInSecs: string;
  designPersonalizedDesc: string;
  designFeaturePhone: string;
  designFeatureLink: string;
  designFeatureNoLogin: string;
  designColorsIncluded: string;
  designColorRose: string;
  designColorLavender: string;
  designColorGold: string;
  designMakeNow: string;
  designSavedPrivate: string;

  // Editor page
  editorBackTo: string;
  editorHeaderBadge: string;
  editorHeaderTitle: string;
  editorHeaderSubtitle: string;
  editorStep: string;
  editorForWhomLabel: string;
  editorForWhomPlaceholder: string;
  editorSenderLabel: string;
  editorSenderPlaceholder: string;
  editorDateLabel: string;
  editorDateOptional: string;
  editorMessageLabel: string;
  editorMessageOptional: string;
  editorMessagePlaceholder: string;
  editorThemeLabel: string;
  editorThemeRose: string;
  editorThemeLavender: string;
  editorThemeGold: string;
  editorSubmitButton: string;
  editorSubmitting: string;
  editorReadyInstant: string;
  editorErrorNames: string;
  editorErrorSave: string;
  editorPreviewTitle: string;
  editorPreviewFrom: string;
  editorPreviewSomeone: string;

  // Today / Moments page
  todayCornerBadge: string;
  todayTitle: string;
  todaySubtitle: string;
  todaySavedBadge: string;
  todaySectionTitle: string;
  todaySectionDesc: string;
  todayOpenPage: string;
  todayCopyLink: string;
  todayCopied: string;
  todayEmptyTitle: string;
  todayEmptyDesc: string;
  todayEmptyButton: string;
  todayReminderBadge: string;
  todayReminderTitle: string;
  todayReminderDesc: string;
  todayMakeAnother: string;
  todayStorageNotice: string;

  // Profile page
  profileBadge: string;
  profileTitle: string;
  profileSubtitle: string;
  profileGuestTitle: string;
  profileGuestDesc: string;
  profileGuestButton: string;
  profileStatsMoments: string;
  profileStatsDevice: string;
  profileStatsJoined: string;
  profileMomentsTitle: string;
  profileMomentsDesc: string;
  profileViewAll: string;
  profileSignOut: string;
  profileSignOutDesc: string;
  profileAccountBadge: string;

  // Sign In page
  signInWelcomeBadge: string;
  signInTitle: string;
  signInSubtitle: string;
  signInWithGoogle: string;
  signInConnecting: string;
  signInBenefit1: string;
  signInBenefit2: string;
  signInBenefit3: string;
  signInJustBrowsing: string;
  signInBrowseTemplates: string;
  signInAlreadyBadge: string;
  signInAlreadyTitle: string;
  signInAlreadyDesc: string;
  signInAlreadyContinue: string;

  // Public / Keepsake page
  publicOpeningTitle: string;
  publicOpeningDesc: string;
  publicNotFoundTitle: string;
  publicNotFoundDesc: string;
  publicNotFoundButton: string;
  publicMadeForYou: string;
  publicWithLove: string;
  publicCopiedToast: string;
  publicCopyFallbackToast: string;
  publicSharePage: string;
  publicMakeOwn: string;
}

export const translations: Record<Language, Translations> = {
  my: {
    // Navigation & Common
    navHome: "ပင်မ",
    navTemplates: "ဒီဇိုင်းများ",
    navMoments: "အမှတ်တရများ",
    navSignIn: "အကောင့်ဝင်ရန်",
    navSignOut: "အကောင့်ထွက်ရန်",
    navMakePage: "ဒီဇိုင်းဖန်တီးမယ်",
    navProfile: "ပရိုဖိုင်",

    // Footer
    footerTagline: "ခံစားချက်လေးတွေကို အမြတ်တနိုး သိမ်းဆည်းထားဖို့ · မြန်မာနိုင်ငံတွင် ပြုလုပ်သည်",
    footerFindMoment: "ဒီဇိုင်းများကြည့်ရှုရန်",

    // Home - Hero
    heroBadge: "နှလုံးသားထဲက အမှတ်တရလေးတစ်ခု",
    heroTitlePrefix: "တစ်သက်လုံး သိမ်းဆည်းထားမယ့်",
    heroTitleKeep: "အမှတ်တရ စာမျက်နှာလေး ဖန်တီးလိုက်ပါ။",
    heroSubtitle: "မွေးနေ့၊ နှစ်ပတ်လည်နဲ့ ချစ်စနိုး ခံစားချက်လေးတွေကို အထူးသီးသန့် ဒီဂျစ်တယ် အမှတ်တရ စာမျက်နှာအဖြစ် ပြောင်းလဲလိုက်ပါ။ ဒီဇိုင်းကျွမ်းကျင်စရာမလိုဘဲ နာမည်နဲ့ သင့်စကားလေးတွေ ဖြည့်ရုံပါပဲ။",
    heroFindTemplate: "ဒီဇိုင်းတစ်ခု ရွေးမယ်",
    heroYourMoments: "သင့်အမှတ်တရများ",
    heroTagline: "မြန်မာနိုင်ငံတွင် မေတ္တာဖြင့် ဖန်တီးထားသည် · စိတ်ကူးယဉ် ဒီဇိုင်းများ ၅,၀၀၀ ကျပ်မှ စတင်ပါသည်",
    heroCardBadge: "သင့်အတွက် သီးသန့် စာမျက်နှာလေး",
    heroCardTitle: "ချစ်ခင်ရသူ တစ်ဦးထံသို့",
    heroCardDesc: "ခံစားချက်တိုင်းအတွက် လှပတဲ့ နေရာလေးတစ်ခု ရှိသင့်ပါတယ်။",
    heroCardLove: "မေတ္တာများစွာဖြင့် သင့်ထံမှ",

    // Home - Steps
    stepsBadge: "စိတ်ကူးမှသည် အမှတ်တရဆီသို့",
    stepsTitle: "လှပတဲ့ အမှတ်တရဖန်တီးဖို့ ထင်ထားတာထက် လွယ်ကူပါတယ်။",
    stepsSubtitle: "ရိုးရှင်းတဲ့ အဆင့် ၄ ဆင့်နဲ့ သင့်ရဲ့ အမှတ်တရလေးကို ဖန်တီးလိုက်ပါ။",
    step1Title: "ဒီဇိုင်းတစ်ခု ရွေးချယ်ပါ",
    step1Desc: "သူတို့နဲ့ လိုက်ဖက်မယ့် စိတ်ကြိုက် စတိုင်လေးကို ရွေးချယ်ပါ။",
    step2Title: "သင့်ခံစားချက် ဖြည့်စွက်ပါ",
    step2Desc: "သူ့နာမည်၊ သင့်ဆုမွန်ကောင်းစကားနဲ့ အမှတ်တရရက်စွဲလေး ထည့်ပါ။",
    step3Title: "မေတ္တာလက်ဆောင် ပေးပို့ပါ",
    step3Desc: "သီးသန့် လင့်ခ်လေးတစ်ခုတည်းနဲ့ သူ့ထံ အရောက်ပို့လိုက်ပါ။",
    step4Title: "အမြတ်တနိုး သိမ်းဆည်းထားပါ",
    step4Desc: "ဖန်တီးထားတဲ့ စာမျက်နှာတွေကို ဒီဖုန်းထဲမှာ အချိန်မရွေး ပြန်ကြည့်နိုင်ပါတယ်။",

    // Home - Featured
    featuredBadge: "လူကြိုက်အများဆုံး ဒီဇိုင်းများ",
    featuredTitle: "သင့်ခံစားချက်နဲ့ ကိုက်ညီတဲ့ ဒီဇိုင်း။",
    featuredSubtitle: "ဒီဇိုင်းတိုင်းက အစပျိုးရုံသာ၊ အဓိပ္ပာယ်ကတော့ သင်ကိုယ်တိုင် ဖြည့်ဆည်းပေးရမှာပါ။",
    featuredBrowseAll: "ဒီဇိုင်း ၁၈ မျိုးလုံး ကြည့်ရှုရန်",
    exploreDesign: "ဒီဇိုင်းကြည့်ရှုရန်",

    // Home - Testimonials
    testimonialsBadge: "အသုံးပြုသူတို့၏ ရင်တွင်းစကား",
    testimonialsTitle: "ဝေမျှရတဲ့ ပျော်ရွှင်ကြည်နူးမှုများ။",
    testimonial1Quote: "“ညသန်းခေါင်မှာ သူဖွင့်ကြည့်ပြီး ချက်ချင်းဖုန်းဆက်လာတယ်။ အဝေးကနေ ဖက်ထားသလို ခံစားရတယ်လို့ ပြောပါတယ်။”",
    testimonial1Author: "မေ",
    testimonial1City: "ရန်ကုန်",
    testimonial2Quote: "“ဒီလို စာမျက်နှာမျိုးလုပ်ရတာ ခက်မယ်ထင်ခဲ့တာ။ စာရေးတဲ့ အချိန်လောက်တောင် မကြာဘူး၊ အရမ်းလွယ်တယ်။”",
    testimonial2Author: "နေခြည်",
    testimonial2City: "မန္တလေး",
    testimonial3Quote: "“မိသားစုအားလုံးကို လင့်ခ်ပို့ပေးခဲ့တာ။ တစ်ပတ်ကြာတဲ့အထိ အဘွားက ဖုန်းထဲမှာ ဖွင့်ကြည့်နေတုန်းပဲ။”",
    testimonial3Author: "သီရိ",
    testimonial3City: "ပဲခူး",

    // Home - CTA
    ctaBadge: "သင့်အလှည့် ရောက်ပါပြီ",
    ctaTitle: "အမြဲတမ်း သိမ်းဆည်းထားချင်စရာကောင်းအောင် ပြောပြလိုက်ပါ။",
    ctaSubtitle: "ဒီဇိုင်းတစ်ခုနဲ့ စတင်လိုက်ပါ။ မမေ့နိုင်စရာ အမှတ်တရလေးတစ်ခု ကျန်ရစ်စေမှာပါ။",
    ctaButton: "စာမျက်နှာ ဖန်တီးမယ်",

    // Templates page
    templatesBadge: "ခံစားချက်တိုင်းအတွက် စာမျက်နှာတစ်ခုစီ",
    templatesTitle: "သင့်အခိုက်အတန့်ကို ရှာဖွေပါ။",
    templatesSubtitle: "မည်သို့ခံစားရမည်ကို ကြည့်ရှုရန် ဒီဇိုင်းတစ်ခုကို ရွေးချယ်ပြီး သင့်ကိုယ်ပိုင်စကားလုံးများဖြင့် ပြင်ဆင်ပါ။",
    templatesCountSuffix: "ဒီဇိုင်းများ",
    templatesEmptyTitle: "နောက်ထပ် ဒီဇိုင်းသစ်များ မကြာမီ လာပါမည်",
    templatesEmptyDesc: "လောလောဆယ် အခြား ကဏ္ဍတစ်ခုကို ရွေးချယ်ကြည့်ပါ။",
    catAll: "ဒီဇိုင်းအားလုံး",
    catLoveNote: "အချစ်စာလွှာ",
    catAnniversary: "နှစ်ပတ်လည်",
    catBirthday: "မွေးနေ့",
    catWedding: "မင်္ဂလာဆောင်",
    catFriendship: "သံယောဇဉ်",
    catMemory: "အမှတ်တရ",

    // Design page
    designAllTemplates: "ဒီဇိုင်းများ အားလုံးသို့",
    designPreviewMockup: "တိုက်ရိုက် အစမ်းကြည့်ရှုမှု · ဖုန်းမျက်နှာပြင်တိုင်းတွင် လှပစွာ ပေါ်လွင်ပါသည်",
    designMadeForYou: "သင့်အတွက် သီးသန့် စာမျက်နှာလေး",
    designWithLove: "မေတ္တာများစွာဖြင့် အမြဲတမ်း",
    designTemplatePrice: "ဒီဇိုင်း စျေးနှုန်း",
    designNoSubs: "လစဉ်ကြေး ပေးသွင်းရန် မလိုပါ",
    designPersonalizedInSecs: "စက္ကန့်ပိုင်းအတွင်း ပြင်ဆင်နိုင်သည်",
    designPersonalizedDesc: "သူ့နာမည်၊ သင့်နာမည်၊ အမှတ်တရရက်စွဲနဲ့ သင့်ရင်တွင်းဖြစ် စာလွှာတို့ကို ထည့်သွင်းပါ။ သီးသန့် လင့်ခ်တစ်ခု ချက်ချင်း ဖန်တီးပေးပါမည်။",
    designFeaturePhone: "မည်သည့် စမတ်ဖုန်းတွင်မဆို အသုံးပြုနိုင်သည်",
    designFeatureLink: "ချက်ချင်း မျှဝေနိုင်သော လင့်ခ်",
    designFeatureNoLogin: "အကောင့်ဖွင့်ရန် မလိုပါ",
    designColorsIncluded: "ပါဝင်သော အရောင်ခံစားချက်များ",
    designColorRose: "နှင်းဆီနီ",
    designColorLavender: "ခရမ်းနု",
    designColorGold: "ရွှေရောင်",
    designMakeNow: "ဒီစာမျက်နှာကို အခုပဲ ပြုလုပ်မယ်",
    designSavedPrivate: "သင့်ဖုန်း၏ ဘရောက်ဆာထဲတွင် သီးသန့် လုံခြုံစွာ သိမ်းဆည်းထားသည်။",

    // Editor page
    editorBackTo: "သို့ ပြန်သွားရန်",
    editorHeaderBadge: "သင့်စကားလုံးများက အဓိပ္ပာယ်ဖော်ဆောင်ပါသည်",
    editorHeaderTitle: "အမှတ်တရ စာမျက်နှာလေး ပြုလုပ်ပါ။",
    editorHeaderSubtitle: "အချက်အလက် အနည်းငယ်သာ လိုအပ်ပါသည်။ သင့်စာမျက်နှာ ပုံပေါ်လာပုံကို တိုက်ရိုက် ကြည့်ရှုနိုင်ပါသည်။",
    editorStep: "အဆင့် ၁ / ၁",
    editorForWhomLabel: "ဤစာမျက်နှာသည် မည်သူ့အတွက်နည်း?",
    editorForWhomPlaceholder: "လက်ခံမည့်သူ၏ နာမည် (ဥပမာ - နေခြည်၊ မေ၊ သို့မဟုတ် ချစ်ရသူ)",
    editorSenderLabel: "သင့်နာမည် / နှုတ်ဆက်စကား",
    editorSenderPlaceholder: "သင့်ကို ခေါ်ဆိုသော နာမည် (ဥပမာ - အမြဲချစ်သော ဒန်နီရယ်)",
    editorDateLabel: "အမှတ်တရ ရက်စွဲ",
    editorDateOptional: "(မထည့်လည်း ရပါသည်)",
    editorMessageLabel: "သင့်ရင်တွင်းစကား / စာလွှာ",
    editorMessageOptional: "(မထည့်လည်း ရပါသည်)",
    editorMessagePlaceholder: "အခုအချိန်မှာ ပြောပြချင်တဲ့ စကားလေးတွေ ရေးပါ… တိုတိုလေးဖြစ်ဖြစ်၊ စာလွှာရှည်ကြီးဖြစ်ဖြစ် ရေးနိုင်ပါတယ်။",
    editorThemeLabel: "အရောင်ခံစားချက် ရွေးချယ်ပါ",
    editorThemeRose: "နှင်းဆီရောင် — နွေးထွေး၊ နူးညံ့ပြီး ရိုမန်းတစ်ဆန်သော",
    editorThemeLavender: "ခရမ်းနုရောင် — နူးညံ့၊ စိတ်ကူးယဉ်ဆန်ပြီး အေးချမ်းသော",
    editorThemeGold: "ရွှေရောင် — တောက်ပ၊ ခေတ်မမီဘဲ အမြဲတမ်း တင့်တယ်သော",
    editorSubmitButton: "ဖန်တီးပြီး မျှဝေမည့် လင့်ခ်ရယူမယ်",
    editorSubmitting: "အမှတ်တရ စာမျက်နှာ ပြုလုပ်နေပါသည်…",
    editorReadyInstant: "လင့်ခ်ကို ချက်ချင်း ရရှိပါမည်။ အကောင့်ဖွင့်ရန် မလိုပါ။",
    editorErrorNames: "လက်ခံသူနှင့် ပေးပို့သူ နာမည်နှစ်ခုလုံး ထည့်သွင်းပေးပါ။",
    editorErrorSave: "လောလောဆယ် သိမ်းဆည်း၍ မရသေးပါ။ ကျေးဇူးပြု၍ ထပ်မံကြိုးစားပါ။",
    editorPreviewTitle: "အတွက် သီးသန့် စာမျက်နှာလေး",
    editorPreviewFrom: "ထံမှ",
    editorPreviewSomeone: "ချစ်ခင်ရသူ တစ်ဦး",

    // Today / Moments page
    todayCornerBadge: "သင့်ကိုယ်ပိုင် ထောင့်လေး",
    todayTitle: "သင့်အမှတ်တရများ။",
    todaySubtitle: "ဤစက်ပစ္စည်းတွင် သင်ဖန်တီးခဲ့သော အမှတ်တရ စာမျက်နှာများကို တစ်နေရာတည်းတွင် လုံခြုံစွာ သိမ်းဆည်းထားပါသည်။",
    todaySavedBadge: "သင့်အတွက် သိမ်းဆည်းထားသည်",
    todaySectionTitle: "လင့်ခ်တိုင်းမှာ ဇာတ်လမ်းလေးတစ်ခုစီ ရှိပါတယ်။",
    todaySectionDesc: "သင့်တော်တဲ့ အချိန်တိုင်းမှာ ပြန်လည် မျှဝေနိုင်ပါတယ်။",
    todayOpenPage: "စာမျက်နှာ ဖွင့်ရန်",
    todayCopyLink: "လင့်ခ် ကူးယူရန်",
    todayCopied: "ကူးယူပြီးပါပြီ",
    todayEmptyTitle: "သင့်ရဲ့ ပထမဆုံး အမှတ်တရလေးကို စောင့်မျှော်နေပါတယ်",
    todayEmptyDesc: "ဒီဇိုင်းတစ်ခုကို ရွေးချယ်ပြီး ဒီနေ့ပဲ ချစ်ရသူတစ်ဦးကို အထူးခံစားရစေလိုက်ပါ။",
    todayEmptyButton: "ဒီဇိုင်းတစ်ခု ရွေးမယ်",
    todayReminderBadge: "သတိရစရာလေးတစ်ခု",
    todayReminderTitle: "အကောင်းဆုံး လက်ဆောင်ဆိုတာ သင့်ရဲ့ ရိုးသားတဲ့ စကားလုံးတွေပါပဲ။",
    todayReminderDesc: "နာမည်တစ်ခု၊ စိတ်ရင်းစကား အနည်းငယ်နဲ့ ပို့ရလွယ်တဲ့ လင့်ခ်လေးတစ်ခု။ အကြိမ်ကြိမ် ပြန်ကြည့်ချင်စရာ အမှတ်တရတစ်ခု ဖန်တီးဖို့ ဒါလေးပဲ လိုအပ်ပါတယ်။",
    todayMakeAnother: "နောက်ထပ် စာမျက်နှာတစ်ခု ပြုလုပ်မယ်",
    todayStorageNotice: "လင့်ခ်များကို ဤစက်ရှိ သင့်ဘရောက်ဆာတွင် သိမ်းဆည်းထားပါသည်။",

    // Profile page
    profileBadge: "သင့်အကောင့်",
    profileTitle: "ပရိုဖိုင်",
    profileSubtitle: "သင့်ဖန်တီးမှုများနှင့် သင့်အကောင့်အချက်အလက်များကို ဤနေရာတွင် ကြည့်ရှုနိုင်ပါသည်။",
    profileGuestTitle: "ဝင်ရောက်ပြီး ပိုမိုများပြားသော အဆင်ပြေမှုများ ရယူပါ",
    profileGuestDesc: "Google အကောင့်ဖြင့် ဝင်ရောက်ပါ၊ ဒါမှသာ သင်ဖန်တီးသည့် အမှတ်တရ စာမျက်နှာများကို လုံခြုံစွာ သိမ်းဆည်းနိုင်ပါမည်။",
    profileGuestButton: "Google ဖြင့် ဝင်ရောက်ရန်",
    profileStatsMoments: "ဖန်တီးထားသော အမှတ်တရများ",
    profileStatsDevice: "ဤစက်ပစ္စည်းတွင် သိမ်းဆည်းထားသည်",
    profileStatsJoined: "ဝင်ရောက်ပြီး",
    profileMomentsTitle: "သင့်ဖန်တီးမှုများ",
    profileMomentsDesc: "သင်ဖန်တီးခဲ့သော အမှတ်တရ စာမျက်နှာများအားလုံး",
    profileViewAll: "အားလုံးကြည့်ရှုရန်",
    profileSignOut: "အကောင့်ထွက်မည်",
    profileSignOutDesc: "သင့်အကောင့်မှ ထွက်ချင်သေချာပါသလား?",
    profileAccountBadge: "Google ဖြင့် ချိတ်ဆက်ထားသည်",

    // Sign In page
    signInWelcomeBadge: "Sweetmemos အကောင့်",
    signInTitle: "သင့်အကောင့်သို့ ဝင်ရောက်ပါ။",
    signInSubtitle: "သင်ဖန်တီးထားသော အမှတ်တရ လင့်ခ်များကို လုံခြုံစွာ ထိန်းသိမ်းပြီး စက်ပစ္စည်းအားလုံးတွင် ချိတ်ဆက်ထားပါ။",
    signInWithGoogle: "Google ဖြင့် အကောင့်ဝင်ရန်",
    signInConnecting: "Google ဖြင့် ချိတ်ဆက်နေပါသည်…",
    signInBenefit1: "Google အကောင့်ဖြင့် တစ်ချက်နှိပ်ရုံဖြင့် လုံခြုံစွာ ဝင်ရောက်နိုင်သည်",
    signInBenefit2: "သင်ဖန်တီးထားသော အမှတ်တရများကို ပရိုဖိုင်တွင် လုံခြုံစွာ သိမ်းဆည်းနိုင်သည်",
    signInBenefit3: "မှတ်သားထားရန် လျှို့ဝှက်နံပါတ် (password) မလိုအပ်ပါ",
    signInJustBrowsing: "လေ့လာကြည့်ရုံသာလား?",
    signInBrowseTemplates: "အကောင့်မဝင်ဘဲ ဒီဇိုင်းများ ကြည့်ရှုရန်",
    signInAlreadyBadge: "အကောင့်ဝင်ထားပြီးဖြစ်သည်",
    signInAlreadyTitle: "ကြိုဆိုပါတယ်၊",
    signInAlreadyDesc: "ဖြင့် အကောင့်ဝင်ထားပါသည်",
    signInAlreadyContinue: "သင့်အမှတ်တရများဆီသို့ ဆက်သွားရန်",

    // Public / Keepsake page
    publicOpeningTitle: "သင့်အမှတ်တရလေးကို ဖွင့်လှစ်နေပါသည်…",
    publicOpeningDesc: "ခံစားချက်လေးများ ရောက်ရှိလာရန် ခေတ္တစောင့်ဆိုင်းပေးပါ။",
    publicNotFoundTitle: "ဤစာမျက်နှာကို ရှာမတွေ့ပါ။",
    publicNotFoundDesc: "လင့်ခ် သက်တမ်းကုန်သွားခြင်း သို့မဟုတ် အခြားဘရောက်ဆာတစ်ခုတွင် သိမ်းဆည်းထားခြင်း ဖြစ်နိုင်ပါသည်။",
    publicNotFoundButton: "သင့်ကိုယ်ပိုင် စာမျက်နှာ ဖန်တီးမယ်",
    publicMadeForYou: "သင့်အတွက် သီးသန့် စာမျက်နှာလေး",
    publicWithLove: "မေတ္တာများစွာဖြင့် အမြဲတမ်း",
    publicCopiedToast: "လင့်ခ်ကို ကူးယူပြီးပါပြီ!",
    publicCopyFallbackToast: "ကျေးဇူးပြု၍ ဘရောက်ဆာ လိပ်စာဘားမှ URL ကို ကူးယူပါ။",
    publicSharePage: "ဤစာမျက်နှာကို မျှဝေရန်",
    publicMakeOwn: "သင့်အတွက် စာမျက်နှာလေး ပြုလုပ်ချင်ပါသလား?",
  },

  en: {
    // Navigation & Common
    navHome: "Home",
    navTemplates: "Templates",
    navMoments: "My Moments",
    navSignIn: "Sign in",
    navSignOut: "Sign out",
    navMakePage: "Make a page",
    navProfile: "Profile",

    // Footer
    footerTagline: "A small page for a very big feeling · Made in Myanmar",
    footerFindMoment: "Find your moment",

    // Home - Hero
    heroBadge: "A thoughtful little something",
    heroTitlePrefix: "Make a moment",
    heroTitleKeep: "they can keep.",
    heroSubtitle: "Turn birthdays, anniversaries, and just-because feelings into a beautiful digital keepsake made for one person. No design skills needed — just a name and your words.",
    heroFindTemplate: "Find a template",
    heroYourMoments: "Your moments",
    heroTagline: "Made with care in Myanmar · Thoughtful designs from 5,000 Ks",
    heroCardBadge: "A Little Page For Someone",
    heroCardTitle: "For someone wonderful",
    heroCardDesc: "Some feelings deserve a lovely place to live.",
    heroCardLove: "Made with love, by you",

    // Home - Steps
    stepsBadge: "From thought to keepsake",
    stepsTitle: "Lovely is easier than you think.",
    stepsSubtitle: "Your next little celebration is four simple steps away.",
    step1Title: "Pick a page",
    step1Desc: "Choose a design that feels like them from our curated moments.",
    step2Title: "Make it yours",
    step2Desc: "Add their name, your heartfelt message, and a special date.",
    step3Title: "Send a little love",
    step3Desc: "Share their personalized page with one simple, private link.",
    step4Title: "Keep the moment",
    step4Desc: "Come back to all your creations anytime on this device.",

    // Home - Featured
    featuredBadge: "A few favorites",
    featuredTitle: "Find the feeling.",
    featuredSubtitle: "Each design is a starting point. The meaning comes from you.",
    featuredBrowseAll: "Browse all 18 templates",
    exploreDesign: "Explore design",

    // Home - Testimonials
    testimonialsBadge: "Little notes from people",
    testimonialsTitle: "Good feelings, shared.",
    testimonial1Quote: "“She opened it at midnight and called me straight away. It felt like giving her a hug from far away.”",
    testimonial1Author: "May",
    testimonial1City: "Yangon",
    testimonial2Quote: "“I thought making something like this would be hard. It took less time than writing the message.”",
    testimonial2Author: "Nay Chi",
    testimonial2City: "Mandalay",
    testimonial3Quote: "“We sent the link to everyone in the family. A week later, grandma still had it open.”",
    testimonial3Author: "Thiri",
    testimonial3City: "Bago",

    // Home - CTA
    ctaBadge: "The next occasion is yours",
    ctaTitle: "Say it in a way they can keep.",
    ctaSubtitle: "Start with a template. Leave with an unforgettable moment.",
    ctaButton: "Make your page",

    // Templates page
    templatesBadge: "A page for every kind of feeling",
    templatesTitle: "Find your moment.",
    templatesSubtitle: "Choose a design to see how it might feel, then customize it with your own words.",
    templatesCountSuffix: "thoughtful designs",
    templatesEmptyTitle: "More moments are on their way",
    templatesEmptyDesc: "Try selecting another category for now.",
    catAll: "All moments",
    catLoveNote: "Love note",
    catAnniversary: "Anniversary",
    catBirthday: "Birthday",
    catWedding: "Wedding",
    catFriendship: "Friendship",
    catMemory: "Memory",

    // Design page
    designAllTemplates: "All templates",
    designPreviewMockup: "Live preview mockup · Adapts beautifully to mobile screens",
    designMadeForYou: "A Page Made For You",
    designWithLove: "With love, always",
    designTemplatePrice: "Template Price",
    designNoSubs: "No subscriptions or recurring fees",
    designPersonalizedInSecs: "Personalized in seconds",
    designPersonalizedDesc: "Add their name, how you sign off, an optional milestone date, and your personal note. We generate a custom share link instantly.",
    designFeaturePhone: "Works on any phone",
    designFeatureLink: "Instant share link",
    designFeatureNoLogin: "No login required",
    designColorsIncluded: "Color feelings included",
    designColorRose: "Rose",
    designColorLavender: "Lavender",
    designColorGold: "Gold",
    designMakeNow: "Make this page now",
    designSavedPrivate: "Saved privately in this browser on this device.",

    // Editor page
    editorBackTo: "Back to",
    editorHeaderBadge: "Your words make it yours",
    editorHeaderTitle: "Make a little moment.",
    editorHeaderSubtitle: "A few details are all it takes. Watch your page take shape in real-time.",
    editorStep: "Step 1 of 1",
    editorForWhomLabel: "Who is this page for?",
    editorForWhomPlaceholder: "Their name (e.g. Nay Chi, May, or My Love)",
    editorSenderLabel: "Your name / sign-off",
    editorSenderPlaceholder: "How they know you (e.g. Always yours, Danial)",
    editorDateLabel: "A date to remember",
    editorDateOptional: "(optional)",
    editorMessageLabel: "Your message",
    editorMessageOptional: "(optional)",
    editorMessagePlaceholder: "Write what you wish you could say right now… Keep it short or write a whole letter.",
    editorThemeLabel: "Choose color feeling",
    editorThemeRose: "Rose — Warm, tender and romantic",
    editorThemeLavender: "Lavender — Soft, dreamy and calm",
    editorThemeGold: "Gold — Bright, timeless and sunny",
    editorSubmitButton: "Create & Get Shareable Link",
    editorSubmitting: "Making your keepsake page…",
    editorReadyInstant: "Your link will be ready immediately. No account needed.",
    editorErrorNames: "Please add both recipient and sender names.",
    editorErrorSave: "Unable to save this moment right now. Please try again.",
    editorPreviewTitle: "A Little Page For",
    editorPreviewFrom: "From",
    editorPreviewSomeone: "someone who cares",

    // Today / Moments page
    todayCornerBadge: "Your little corner",
    todayTitle: "Your moments.",
    todaySubtitle: "Keepsake pages you’ve created on this device, all stored safely in one place.",
    todaySavedBadge: "Saved here for you",
    todaySectionTitle: "Every link has a little story.",
    todaySectionDesc: "Share it again whenever the moment feels right.",
    todayOpenPage: "Open page",
    todayCopyLink: "Copy link",
    todayCopied: "Copied",
    todayEmptyTitle: "Your first moment is waiting",
    todayEmptyDesc: "Pick a template and make someone feel truly special today.",
    todayEmptyButton: "Choose a template",
    todayReminderBadge: "A gentle reminder",
    todayReminderTitle: "The best gifts sound like you.",
    todayReminderDesc: "A name, a few honest words, and a link that’s easy to send. That’s all it takes to create a memory they will revisit again and again.",
    todayMakeAnother: "Make another page",
    todayStorageNotice: "Links are saved in your local browser on this device.",

    // Profile page
    profileBadge: "Your account",
    profileTitle: "Profile",
    profileSubtitle: "View your creations and account details all in one place.",
    profileGuestTitle: "Sign in for a better experience",
    profileGuestDesc: "Connect with Google to safely save and revisit every keepsake page you create.",
    profileGuestButton: "Sign in with Google",
    profileStatsMoments: "Moments created",
    profileStatsDevice: "Saved on this device",
    profileStatsJoined: "Member since",
    profileMomentsTitle: "Your creations",
    profileMomentsDesc: "All the keepsake pages you've made",
    profileViewAll: "View all moments",
    profileSignOut: "Sign out",
    profileSignOutDesc: "Are you sure you want to sign out?",
    profileAccountBadge: "Connected via Google",

    // Sign In page
    signInWelcomeBadge: "Sweetmemos Account",
    signInTitle: "Sign in to your corner.",
    signInSubtitle: "Keep all your created celebration links safe and sync your moments across all your devices.",
    signInWithGoogle: "Sign in with Google",
    signInConnecting: "Connecting with Google…",
    signInBenefit1: "Secure, one-tap authentication with your Google account",
    signInBenefit2: "Save your keepsake pages safely to your profile",
    signInBenefit3: "No passwords to memorize or forget",
    signInJustBrowsing: "Just looking around?",
    signInBrowseTemplates: "Browse templates without signing in",
    signInAlreadyBadge: "Already Signed In",
    signInAlreadyTitle: "Welcome back,",
    signInAlreadyDesc: "Signed in with",
    signInAlreadyContinue: "Continue to Your Moments",

    // Public / Keepsake page
    publicOpeningTitle: "Opening your moment…",
    publicOpeningDesc: "Just a brief second while the feeling arrives.",
    publicNotFoundTitle: "This page couldn’t be found.",
    publicNotFoundDesc: "The link may have expired or this keepsake is stored in another browser.",
    publicNotFoundButton: "Create your own page",
    publicMadeForYou: "A Page Made For You",
    publicWithLove: "With love, always",
    publicCopiedToast: "Link copied!",
    publicCopyFallbackToast: "Please copy the URL from your browser address bar.",
    publicSharePage: "Share this page",
    publicMakeOwn: "Want to make a page for someone?",
  },
};
