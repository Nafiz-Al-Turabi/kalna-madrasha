import React, { useState } from 'react';
import bg from '../../assets/bg.jpg';

const Description = () => {
    const initialContentLength = 1200;
    const [showFullContent, setShowFullContent] = useState(false);

    // Your content goes here
    const fullContent = `কালনা আমিনিয়া ফাজিল (ডিগ্রি) মাদরাসাটি ১৯৩৫ খ্রিস্টাব্দে পাক ভারত উপমহাদেশের শ্রেষ্ঠ ওলিকুল শিরোমনি আল্লামা রুহুল আমিন (রহ.) এর পরামর্শক্রমে তৎকালীন কালনা ও পার্শ্ববর্তী গ্রামের মুরুব্বীদের সমন্বয়ে মাদরাসাটি প্রতিষ্ঠিত হয়। বিভিন্ন প্রতিকূল অবস্থার মধ্য দিয়ে মাদরাসাটি ধাপে ধাপে এগিয়ে যায়। মাদরাসাটিতে ০১/০১/১৯৭৩ খ্রিস্টাব্দে প্রথম দাখিল পর্যায়ের স্বীকৃতি লাভ করে। তারপর ০১/০৭/১৯৭৮ খ্রিস্টাব্দে আলিম এবং ০১/০৭/১৯৮৭ খ্রিস্টাব্দে ফাজিল(স্নাতক) স্বীকৃতি লাভ করে। তাছাড়া প্রতিষ্ঠানটিতে বিজ্ঞান ও কম্পিউটার শাখা চালু আছে। বর্তমানে মাদরাসাটি কামিল পর্যায়ে উন্নত করার প্রচেষ্টা অব্যাহত রয়েছে। মাদরাসাটির নিজস্ব জমি পরিমাণ ৭.৪৪ একর। প্রতিষ্ঠানটি দক্ষিণ খুলনার সুন্দরবনের পাদদেশে খুলনা-কয়রা মহাসড়কের পাশে কপোতাক্ষ নদের তীরে অবস্থিত হলেও দ্বীনি শিক্ষা বিস্তারে দেশের উল্লেখযোগ্য একটি বিদ্যাপীঠ হিসেবে সকলের কাছে সর্বজনবিদিত। জ্ঞান-বিজ্ঞানের পাশাপাশি নৈতিক শিক্ষার ক্ষেত্রে মাদরাসাটি তার অমূল্য অবদান রেখে চলেছে। তাছাড়া ক্রীড়াঙ্গনে প্রতিষ্ঠানটির বেশ উল্লেখযোগ্য ভূমিকা আছে। ২০২৩ খ্রিস্টাব্দে ফুটবলে বিভাগীয় চ্যাম্পিয়ান হয়ে ক্রীড়াঙ্গনে শীর্ষ স্থান অধিকার করে।একই বছরে প্রতিষ্ঠানটি খুলনা জেলার একটি শ্রেষ্ঠ শিক্ষা প্রতিষ্ঠান হিসেবে সকলের কাছে পরিচিতি লাভ করে। উল্লেখ্য যে ১৩ জুন ২০২০ তৎকালীন সেনাবাহিনী প্রধান এম এ আজিজ মাদরাসাটি সরেজমিনে পরিদর্শন করেন।তাছাড়া লেখাপড়ার পাশাপাশি বিভিন্ন ক্ষেত্রে অবিস্মরণীয় অবদান রেখে স্বগৌরবে মাথা উঁচু করে দাঁড়িয়ে আছে। শেখ রাসেল ডিজিটাল ল্যাব,মুজিব কর্নার,আমিনিয়া মাদ্রাসা মার্কেট,লিল্লাহ বোর্ডিং,বিজ্ঞানাগার,লাইব্রেরী ও ফাতেমা খানম জামে মসজিদ মাদরাসাটির উল্লেখযোগ্য কমপ্লেক্স।প্রতিষ্ঠানটি জ্ঞান-বিজ্ঞান ও নৈতিক শিক্ষার প্রাণকেন্দ্র হিসেবে সকলের কাছে সু-পরিচিত।`;

    const truncatedContent = fullContent.slice(0, initialContentLength);
    const shouldShowSeeMore = fullContent.length > initialContentLength;

    return (
        <div className='mt-20 bg-cover relative' style={{ backgroundImage: `url(${bg})` }}>
            {/* Dark layer */}
            <div className="absolute inset-0 bg-white opacity-75"></div>

            <div className='max-w-7xl mx-auto md:flex gap-6 relative'>
                <div className='w-full lg:w-2/3 px-2 text-center border py-5'>
                    <div className=' '>
                        <h2 className='text-gray-700 text-lg font-semibold'>Welcome Message</h2>
                        <h1 className='text-gray-700 text-3xl'>কালনা আমিনিয়া ফাজিল (ডিগ্রী) মাদরাসা</h1>
                        <h3 className='text-gray-700 text-lg'>বিসমিল্লাহির রাহমানির রাহীম</h3>
                    </div>
                    <p className={`text-justify mt-5 text-gray-800 text-lg  ${showFullContent ? 'overflow-visible' : 'overflow-hidden'}`}>
                        {/* Show content based on state */}
                        {showFullContent ? fullContent : truncatedContent}

                        {/* Conditional rendering of "See More" button */}
                        {shouldShowSeeMore && (
                            <button className="text-blue-500 px-2 bg-slate-300 ml-5" onClick={() => setShowFullContent(!showFullContent)}>
                                {showFullContent ? 'সংক্ষিপ্ত' : 'বিস্তারিত'}
                            </button>
                        )}
                    </p>
                </div>
                <div className='bg-[#DAA520] text-white px-5 w-full md:w-2/6 py-5'>
                    <h3 className='text-center '>بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ</h3>
                    <div>
                        <div>
                            <h1 className='text-xl font-bold my-6'>কুরআনের বানীঃ</h1>
                            <p className='text-right mb-3  '>﴿وَعَلَّمَ ءَادَمَ ٱلۡأَسۡمَآءَ كُلَّهَا ثُمَّ عَرَضَهُمۡ عَلَى ٱلۡمَلَٰٓئِكَةِ فَقَالَ أَنۢبِ‍ُٔونِي بِأَسۡمَآءِ هَٰٓؤُلَآءِ إِن كُنتُمۡ صَٰدِقِينَ ٣١ قَالُواْ سُبۡحَٰنَكَ لَا عِلۡمَ لَنَآ إِلَّا مَا عَلَّمۡتَنَآۖ إِنَّكَ أَنتَ ٱلۡعَلِيمُ ٱلۡحَكِيمُ ٣٢ ﴾ [البقرة: ٣١، ٣٢]</p>
                            <p className=' text-justify'>আর তিনি আদমকে নামসমূহ সব শিক্ষা দিলেন তারপর তা ফেরেশতাদের সামনে উপস্থাপন করলেন। সুতরাং বললেন, ‘তোমরা আমাকে এগুলোর নাম জানাও, যদি তোমরা সত্যবাদী হও’। তারা বলল, ‘আপনি পবিত্র মহান। আপনি আমাদেরকে যা শিখিয়েছেন, তা ছাড়া আমাদের কোনো জ্ঞান নেই। নিশ্চয় আপনি সর্বজ্ঞ, প্রজ্ঞাময়।</p>
                        </div>
                        <div>
                            <h1 className='text-xl font-bold my-6'>হাদিসের বানীঃ</h1>
                            <p className='mb-3  '>আনাস রাদিয়াল্লাহু ‘আনহু বলেন, রাসূল সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম বলেছেন,</p>
                            <p className='text-right mb-3  '>«من خرج في طلب العلم فهو في سبيل الله حتى يرجع»</p>
                            <p className=' text-justify'>‘যে ব্যক্তি জ্ঞান অমেবষণ করার উদ্দেশ্যে ঘর থেকে বের হয়, সে আল্লাহর পথেই চলতে থাকে, যতক্ষণ না ফিরে আসে।’’</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Description;
