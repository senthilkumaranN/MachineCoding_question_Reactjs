
const dummyApiResponse = {
    showScrollindicator: false,
    showLightAndDarkMode: true,
    showTicTacToeBoard: true,
    showAccordion: true,
    showImageSlider: true,
    showModelPop: true,
    showTabs: true,
    showGitHubFinder: true,
    showLoadMore_Btn: true,
    showSearchAutoComplete: true,
    showStarRating: true


}

function featureFlagDataServiceCall() {
    return new Promise((resolve, reject) => {
        if (dummyApiResponse) setTimeout(resolve(dummyApiResponse), 500);
        else reject("Some error occured! Please try again")
    })
}

export default featureFlagDataServiceCall;