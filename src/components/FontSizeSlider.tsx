import { ChevronDown } from 'lucide-react'
import { TYPOGRAPHY, type Typography } from '../constants'

type Props = {
  fontSize: number
  fontFamily: Typography
  setFontSize: (fontSize: number) => void
  onFontChange: (typography: Typography) => void
}

export const FontSizeSlider = (props: Props) => {
  const { fontSize, fontFamily, setFontSize, onFontChange } = props

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value, 10)
    setFontSize(newSize)
  }

  const optionStyle = 'bg-cPrimary h-10 text-lg text-cTextPrimary font-semibold'

  return (
    <>
      <div className="grid">
        <div className="relative w-full flex items-center">
          <select
            onChange={(event) =>
              onFontChange(event?.target.value as Typography)
            }
            value={fontFamily}
            className="grow appearance-none bg-transparent row-start-1 col-start-1 border-2 border-cPrimary text-cTextPrimary px-2 py-1.5 font-semibold focus-visible:outline-0"
          >
            <option className={optionStyle} value={TYPOGRAPHY.INTER}>
              Inter
            </option>
            <option className={optionStyle} value={TYPOGRAPHY.ROBOTO}>
              Roboto
            </option>
            <option className={optionStyle} value={TYPOGRAPHY.MONTSERRAT}>
              Montserrat
            </option>
          </select>
          <ChevronDown className="text-cTextPrimary absolute right-4 events-none" />
        </div>
      </div>
      <div className="flex justify-between items-center font-semibold mt-7 text-[24px]">
        <label>
          <p className="max-sm:text-2xl text-cTextPrimary">Font Size</p>
        </label>
        <p className="px-2 py-1 text-lg text-cTextPrimary border-2 border-cPrimary rounded-[4px] flex items-center justify-center min-w-[60px]">
          {fontSize}
        </p>
      </div>
      <div className="grid place-items-center mt-[31px] sm:mt-7.5">
        <input
          type="range"
          min="8"
          max="72"
          value={fontSize}
          onChange={handleFontSizeChange}
          className="custom-slider bg-transparent appearance-none cursor-pointer w-60"
        />
      </div>
    </>
  )
}
