import { useEffect, useState } from 'react'

import JSConfetti from 'js-confetti'
import { Toaster } from 'react-hot-toast'
import { showToast } from './CustomToast'
import { calculateLineHeight } from './utils'
import { Footer } from './components/Footer'
import { StringTemplate } from './components/StringTemplate'
import { Title } from './components/Title'
import { Button } from './components/common/Button'
import { FontSizeSlider } from './components/FontSizeSlider'
import { TYPOGRAPHY, type Typography } from './constants'

function App() {
  const [fontSize, setFontSize] = useState(16)
  const [currentString, setCurrentString] = useState<Array<string>>([])
  const [fontFamily, setFontFamily] = useState<Typography>(TYPOGRAPHY.INTER)

  const handleKeyPress = (event: KeyboardEvent) => {
    const keyPressed: string = event.key.toLowerCase()
    console.log(currentString.join(''))
    if (currentString.length >= 8) {
      currentString.shift()
    }
    setCurrentString([...currentString, keyPressed])
  }

  const handleChangeTypography = (typography: Typography) => {
    setFontFamily(typography)
  }

  useEffect(() => {
    if (currentString.join('') === 'aforcita') {
      const confetti = new JSConfetti()
      confetti.addConfetti()
      setCurrentString([])
    }
    document.addEventListener('keypress', handleKeyPress)
    return () => {
      document.removeEventListener('keypress', handleKeyPress)
    }
  }, [currentString])

  const generateCode = () => {
    const code = `font-size: ${fontSize}px; line-height: ${lineHeight.toFixed(
      2
    )};`
    navigator.clipboard.writeText(code)
    showToast(code)
  }

  const { lineHeight } = calculateLineHeight(fontSize)

  return (
    <>
      <main className="px-4 mt-[204px] lg:mt-[198px] w-full min-h-full flex flex-col justify-center items-center overflow-hidden">
        <Title />
        <section className="grid grid-cols-1 sm:grid-cols-2 flex-1 sm:gap-10 mt-8 sm:mt-[52px]  max-w-5xl mx-auto overflow-hidden w-full">
          <article className="w-full">
            <FontSizeSlider
              fontSize={fontSize}
              fontFamily={fontFamily}
              setFontSize={setFontSize}
              onFontChange={handleChangeTypography}
            />
            <div className="flex justify-between items-center font-semibold mt-7 text-[24px]">
              <p className="text-cTextPrimary">Line Height</p>
              <p className="px-2 py-1 text-lg text-cTextPrimary border-2 border-cPrimary rounded-[4px] flex items-center justify-center min-w-[60px]">
                {lineHeight.toFixed(2)}
              </p>
            </div>
            <div className="flex w-full justify-center mt-7.5">
              <Button onClick={generateCode}>Copy CSS</Button>
            </div>
          </article>
          <StringTemplate fontSize={fontSize} fontFamily={fontFamily} />
        </section>
      </main>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
