// Function to extract the width percentage from a style attribute
function extractPercentage(styleString) {
    return styleString.substr(styleString.indexOf(":") + 1).trim();
  }
  
  // Select all li elements (adjust the selector as needed)
  const liElements = document.querySelectorAll('ul li[data-type="city"]');
  const data = Array.from(liElements)?.map((li) => {
    const country = li?.querySelector('a[href^="/country"]')?.innerText;
    const city = li?.querySelector("h2.itemName")?.innerText;
    const rank = li?.querySelector(".rank")?.innerText;
    const avgCostPerMonth = li?.querySelector(".price")?.getAttribute("data-usd");
    const description = li?.querySelector(".description").innerText;
    const overAllScore = extractPercentage(
      li?.querySelector(".rating-main-score .filling")?.style.cssText
    );
  
    const ratingCostScore = extractPercentage(
      li?.querySelector(".rating-cost-score .filling")?.style.cssText
    );
    const internetScore = extractPercentage(
      li?.querySelector(".rating-internet-score .filling")?.style.cssText
    );
    const likedScore = extractPercentage(
      li?.querySelector(".rating-like-score .filling")?.style.cssText
    );
    const safetyScore =
      Array.from(li.querySelector(".rating-safety-score").classList)
        .pop()
        .substring(1) *
        20 +
      "%";
  
    return {
      country,
      city,
      rank,
      avgCostPerMonth,
      overAllScore,
      description,
      ratings: {
        cost: ratingCostScore,
        internet: internetScore,
        liked: likedScore,
        safety: safetyScore,
      },
    };
  });
  
  console.log(JSON.stringify(data, null, 2));