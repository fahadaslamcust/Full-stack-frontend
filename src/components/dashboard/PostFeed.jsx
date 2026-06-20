
export default function PostFeed() {
  return (
    <div className="space-y-6">
      
      {/* Post Card 1 (With Image) */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img className="w-10 h-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=60" alt="" />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Muhammad Ali</h3>
              <p className="text-[11px] text-gray-400">CSS Student • 19h</p>
            </div>
          </div>
          <button className="text-xs font-semibold text-gray-400 border border-gray-200 rounded-full px-3 py-1 bg-gray-50">
            Following
          </button>
        </div>
        
        <p className="text-xs text-[#8C8C8C] leading-relaxed pb-2">
          Designed a Student Community App that enables university students to connect, share documents, communicate, and collaborate within their academic community.
        </p>
        
        <div className="rounded-xl overflow-hidden max-h-72 bg-gray-100">
          <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=60" alt="Group Study" />
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-6 pt-2 text-xs text-gray-500 border-t border-gray-50">
          <button className="flex items-center space-x-1.5 text-blue-500 font-medium">
            <svg className="w-4 h-4 fill-blue-500" viewBox="0 0 24 24"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3c1.749 0 3.3.815 4.312 2.087C13.012 3.815 14.564 3 16.31 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" /></svg>
            <span>65</span>
          </button>
          <button className="flex items-center space-x-1.5 hover:text-gray-800">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.92 1.78 4.61 4.61 0 002.811-.777c.512-.304 1.08-.154 1.654.121A9.066 9.066 0 0012 20.25z" /></svg>
            <span>45</span>
          </button>
          <button className="flex items-center space-x-1.5 hover:text-gray-800">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>
            <span>2</span>
          </button>
        </div>
      </div>

      {/* Post Card 2 (Text Only) */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img className="w-10 h-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=60" alt="" />
            <div>
              <h3 className="text-sm font-semibold text-[#000000]">Muhammad Ali</h3>
              <p className="text-[11px] text-[#8C8C8C]">CSS Student • 19h</p>
            </div>
          </div>
          <button className="text-xs font-semibold text-white bg-[#3B82F6] rounded-full px-4 py-1 hover:bg-blue-600">
            + Following
          </button>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">
          Designed a Student Community App that enables university students to connect, share documents, communicate, and collaborate within their academic community.
        </p>
      </div>

    </div>
  );
}