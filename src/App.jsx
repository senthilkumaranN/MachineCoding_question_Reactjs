import React from 'react'
import Accordion from './Accordion'
import StarRating from './starRating'
import ImageSlider from './image-silder'
import LoadMoreBtn from './Load-more-btn'
import DarkSwitchMode from './Dark-Light'
import ScrollIndicator from './scroll-indicator'
import Tabscontent from './Tabs/tabs-content'
import ModelTest from './Model-pop/Model-test'
import Github_Finder from './Github-finder'
import SearchLogic from './Search-AutoComplete'
import TicTacToe from './Tic-tac-toe'
import FeatureFlagsGlobalContext from './Feature-Flags/Context'
import FeatureFlags from './Feature-Flags'
import FormHandling from './Form-handling'
import TableData from './Table-Data'

const App = () => {
  return (
    <div>
      {/* <Accordion/> */}
      {/* <StarRating noOfStars={10}/> */}
      {/* <ImageSlider url={'https://picsum.photos/v2/list'} page={'1'} limit={'10'} /> */}
      {/* <LoadMoreBtn/> */}
      {/* <DarkSwitchMode/> */}

      {/* <ScrollIndicator url={'https://dummyjson.com/products?limit=10&skip=10'}/> */} 

      {/* <Tabscontent/> */}

      {/* <ModelTest/> */}

      {/* <Github_Finder/> */}
      {/* <SearchLogic/> */}

      {/* <TicTacToe/> */}

      {/* <FeatureFlagsGlobalContext>
        <FeatureFlags />
      </FeatureFlagsGlobalContext> */}

      {/* <FormHandling/> */}

      <TableData/>
    </div>
  )
}

export default App