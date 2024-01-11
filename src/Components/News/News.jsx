import React from 'react';

const News = () => {
    return (
        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 my-10'>
            <div class=" rounded overflow-hidden shadow-lg mx-4">
                <img class="w-full h-40 object-cover" src="https://example.com/image1.jpg" alt="Breaking News 1" />
                <div class="p-6">
                    <div class="font-bold text-xl mb-2">Breaking News 1</div>
                    <a href="https://example.com/news1" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full inline-block">
                        Read
                    </a>
                </div>
            </div>

            <div class=" rounded overflow-hidden shadow-lg mx-4">
                <img class="w-full h-40 object-cover" src="https://example.com/image2.jpg" alt="Top Story 2" />
                <div class="p-6">
                    <div class="font-bold text-xl mb-2">Top Story 2</div>
                    <a href="https://example.com/news2" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full inline-block">
                        Read
                    </a>
                </div>
            </div>

            <div class=" rounded overflow-hidden shadow-lg mx-4">
                <img class="w-full h-40 object-cover" src="https://example.com/image3.jpg" alt="Latest Update 3" />
                <div class="p-6">
                    <div class="font-bold text-xl mb-2">Latest Update 3</div>
                    <a href="https://example.com/news3" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full inline-block">
                        Read
                    </a>
                </div>
            </div>

        </div>
    );
};

export default News;