import StarRatings from "react-star-ratings";

export const avgRating = (reviews) => {
    let avgRating;
    let length;
    if (reviews && reviews.length > 0) {
        let total = [];
        reviews.forEach((review) => total.push(review.star));
        const highest = reviews.length * 5;
        const totalReducer = total.reduce((acc, cur) => acc + cur, 0);
        avgRating = (totalReducer * 5) / highest;
        length = reviews.length;
    }

    return (
        <span className="text-danger">
            <StarRatings
                rating={avgRating}
                isSelectable={false}
                starRatedColor="red"
                numberOfStars={5}
                starDimension="20px"
                starSpacing="2px"
            />
            ({length})
        </span>
    );
};
