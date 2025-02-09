import React from 'react'

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode
  lablText?: string
  onSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string

  image: File | undefined
}

const FileInput = React.forwardRef<HTMLInputElement, IProps>(
  (
    {
      children,
      className,
      lablText,
      onChange,
      onSelect,
      error,
      image,

      ...props
    },
    ref,
  ) => {
    function fileChangedHandler(e: React.ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0]
      if (file) {
        onChange && onChange(e)
        onSelect && onSelect(e)
      }
    }

    return (
      <div className={className}>
        {lablText && (
          <label className="block text-gray-600 text-xs lg:text-sm xl:text-base mb-2" htmlFor="txt">
            {lablText}
          </label>
        )}
        <label className=" w-full  relative border flex  rounded-md cursor-pointer  group">
          <div
            className={` inline-block h-full  py-3 rounded-l-md px-2  text-white transition duration-500  bg-primary-500 hover:bg-primary-700 hover:bg-gra  shadow shadow-violet-600/25 hover:shadow-primary-600/75`}
          >
            <input
              className="hidden"
              ref={ref}
              onChange={fileChangedHandler}
              {...props}
              type="file"
            />
            Upload File
          </div>
          <div className="mx-2 break-all flex items-center justify-center">{image?.name}</div>
        </label>
        {error && <p className="text-red-600 text-right animate-shake">{error}</p>}
      </div>
    )
  },
)
FileInput.displayName = 'FileInput'
export default FileInput
