'use client'
import { APOD } from '@repo/shared'
import Image from 'next/image'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { ZoomIn, ZoomOut, RotateCcw, Maximize } from 'lucide-react'
import { Button } from '../ui/button'

interface APodInfoProps {
  data: APOD | undefined
  hasController?: boolean
  date?: string
}

export default function ApodInfo({ data, hasController = false }: Readonly<APodInfoProps>) {
  if (!data) {
    return (
      <div className="h-[60vh] py-8 text-center">
        <h1 className="text-xl text-red-500">No data found!</h1>
        <p className="text-muted-foreground mt-2">Try again later</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto flex flex-col items-center px-4">

      {/* {data.url && (
        <h1 className="mb-5 text-3xl font-bold select-none sm:text-4xl lg:text-5xl">
          {data.title}
        </h1>
      )} */}


      {data.url && (
        <div className="w-full max-w-4xl mb-6">
          <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={4}
            wheel={{ step: 0.1 }}
            pinch={{ step: 5 }}
            doubleClick={{ mode: 'toggle', step: 0.7 }}
          >
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
              <div className="relative">
                {/* Control buttons */}
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                  <Button
                    onClick={() => zoomIn()}
                    size="sm"
                    variant="secondary"
                    className="h-10 w-10 p-0 bg-black/50 hover:bg-black/70 text-white border-0"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => zoomOut()}
                    size="sm"
                    variant="secondary"
                    className="h-10 w-10 p-0 bg-black/50 hover:bg-black/70 text-white border-0"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => resetTransform()}
                    size="sm"
                    variant="secondary"
                    className="h-10 w-10 p-0 bg-black/50 hover:bg-black/70 text-white border-0"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => window.open(data.hdurl || data.url, '_blank')}
                    size="sm"
                    variant="secondary"
                    className="h-10 w-10 p-0 bg-black/50 hover:bg-black/70 text-white border-0"
                  >
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>

                {/* Instructions overlay */}
                <div className="absolute bottom-4 left-4 z-10 bg-black/50 text-white text-xs p-2 rounded backdrop-blur-sm">
                  <p>💡 Double-click to zoom • Scroll to zoom • Drag to pan</p>
                </div>

                <TransformComponent
                  wrapperClass="!w-full !h-[70vh] border border-border rounded-xl overflow-hidden bg-muted/20"
                  contentClass="!w-full !h-full flex items-center justify-center"
                >
                  <Image
                    src={data.url}
                    className="max-w-full max-h-full object-contain cursor-grab active:cursor-grabbing"
                    alt={data.title}
                    width={900}
                    height={900}
                    priority
                    draggable={false}
                  />
                </TransformComponent>
              </div>
            )}
          </TransformWrapper>
        </div>
      )}

      {data.copyright && <p className="text-muted-foreground mt-4">{`© ${data.copyright}`}</p>}

      <div className="container mx-auto mt-8 flex flex-col md:px-8 lg:max-w-[900px]">
        <h1 className="mb-4 text-2xl font-bold">{data.title}</h1>
        <p className="text-muted-foreground">{data.explanation}</p>
      </div>

      {hasController && (
        <div className="mt-8">
          <button className="btn">Previous</button>
          <button className="btn">Next</button>
        </div>
      )}
    </div>
  )
}
