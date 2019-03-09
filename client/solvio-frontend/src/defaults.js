const res1 = {
    id: "1",
    title: "K Tutorial",
    topic: "K",
    url: "https://github.com/kframework/k/tree/master/k-distribution/tutorial/",
    length: 500,
    quality: 82,
}

const res2 = {
    id: "2",
    title: "Formal Verification Workshop 1",
    topic: "K-EVM",
    url: "https://www.youtube.com/watch?v=d6qHxDIeFw0",
    length: 75,
    quality: 78
}

const res3 = {
    id: "3",
    title: "Formal Verification Workshop 2",
    topic: "Formal verification of smart contracts using K",
    url: "https://www.youtube.com/watch?v=n6AgBIkHlhg",
    length: 75,
    quality: 88
}

const rev1 = {
    resource: "1",
    topic: "K",
    quality: 40,
    length: 50,
    dependencies: [{ topic: "Logic", weight: 40}],
    content: "Sucked"
}

const rev2 = {
    resource: "2",
    topic: "K-EVM",
    quality: 80,
    length: 800,
    dependencies: [{ topic: "K", weight: 80}],
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}

const rev3 = {
    resource: "3",
    topic: "Formal verification of smart contracts using K",
    quality: 98,
    length: 300,
    dependencies: [{ topic: "K-EVM", weight: 88}, { topic: "K", weight: 20}],
    content: "Amazing"
}
export const defaultPaths = [
    [res1, res2, res3], 
    [res3, res1], 
    [res3, res3, res2, res1]
]

const defaultReviews = [rev1, rev2, rev3]

export const defaultResource = {id: "1", reviews: defaultReviews}
export const defaultResources = [res1, res2, res3]