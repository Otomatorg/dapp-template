import ImgHyperswapBanner from '@/assets/images/img-hyperswap-banner@2x.png'
import ImgOtomatoHyperswapBanner from '@/assets/images/img-otomato-hyperswap-banner@2x.png'

const Homepage = () => {
  return (
    <main data-page="homepage" className="container py-20">
      <div className="container-xl flex flex-col gap-6">
        <div className="shrink-0">
          <img
            srcSet={`${ImgHyperswapBanner} 1x, ${ImgHyperswapBanner} 2x`}
            alt="hyperswap-banner"
          />
        </div>

        <div className="shrink-0">
          <img
            srcSet={`${ImgOtomatoHyperswapBanner} 1x, ${ImgOtomatoHyperswapBanner} 2x`}
            alt="otomato-hyperswap-banner"
          />
        </div>
      </div>
    </main>
  )
}

export default Homepage
