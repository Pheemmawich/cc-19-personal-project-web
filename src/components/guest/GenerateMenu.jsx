import React from 'react'

function GenerateMenu() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-400">
                    <div className="bg-yellow-400 p-8 rounded-lg shadow-lg w-80">
                        <h1 className="text-center text-2xl font-bold text-black mb-4">create menu from ingredient</h1>
                        <form>
                            <div className="mb-4">
                                <label className="block text-center text-lg text-black mb-2">what in your refridge.</label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-center text-lg text-black mb-2">choose category</label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                            </div>
                            <div className="flex justify-center">
                                <button type="submit" className="bg-gray-800 text-yellow-400 font-bold py-2 px-4 rounded">submit</button>
                            </div>
                        </form>
                    </div>
                </div>
  )
}

export default GenerateMenu