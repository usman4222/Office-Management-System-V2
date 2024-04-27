import React from 'react'

const Loading = () => {
    return (
        <div>
            <div class="flex">
                <div class="relative">
                    <div class="w-12 h-12 rounded-full absolute
                             border-8 border-dashed border-gray-200"></div>

                    <div class="w-12 h-12 rounded-full animate-spin absolute
                             border-8 border-dashed border-[#5C53A4] border-t-transparent"></div>
                </div>
            </div>
        </div>
    )
}

export default Loading
