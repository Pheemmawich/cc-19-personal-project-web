import React from 'react'

function Creator() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="bg-yellow-200 rounded-lg p-4 w-64">
            <h2 className="text-lg font-bold text-purple-900 mb-4">Top Creater</h2>
            <div className="space-y-4">
              {/* {creators.map((creator, index) => (
                <div key={index} className="flex items-center">
                  <img src={creator.imgSrc} alt={`Profile picture of ${creator.name}`} className="w-10 h-10 rounded-full" />
                  <div className="ml-4 flex-1">
                    <p className="font-bold text-gray-900">{creator.name}</p>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-star text-yellow-500"></i>
                    <span className="ml-1 text-gray-900">{creator.score}</span>
                  </div>
                </div>
              ))} */}
            </div>
          </div>
        </div>
  )
}

export default Creator