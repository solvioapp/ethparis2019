# Solvio

## Contributors
dteiml

xanpj

mattskala

corollari

## Database Model

also see [Building Learnasa](https://gist.github.com/dteiml/5bc36c870ccf1bdf0b3ba96480cb2e48)

- user
    - reviews
- topic
    - title
    - resources
- resource
    - topic
    - title
    - url
    - reviews
        - quality
        - length
        - dependencies
            - weight
            - topic
        - content

## API

## Done:

### GET /topics
```
[{
    id: string,
    title: string
}]
```
```
// topicId = sha256(topic title)
```
### GET /topics/:topicId/resources
```
{
    #: Resource
}
```

### GET /resources/:resourceId
```
{
    reviews: {#: Review},
    title: string,
    url: string,
    topic: {title: string}
}
```

### POST /resources
```
{
    title: string,
    url: string,
    topic: string // topic title
}
```
```
200
{
    id: string
}
```

### POST /resources/:resourceId/reviews/:reviewId
**NOTE: Before adding a review, a review ID should be created and the smart contract method called**
```
{
    quality: int,
    length: int, // minutes
    dependencies: [{weight, topic_id}],
    content: string
}
```


### GET /search?q=:query
```
{
    topics: [{id: string, title: string}],
    resources: [{id: string, title: string}]
}
```

## Doing:

### GET /topics/:topicId/learning_paths
```
[
    resource[]
]
```

## User stories:
(sorted in order of importance)
- Add Resource
- Add Review
    - Metadata
        - Natural language content
        - Quality
        - Length
        - Dependencies
    - Stake the review
- Self-attest knowledge
- Request learning path
    - Search for goal
    - See the learning tree
- Challenge review

## Server:
- includes gunDB server
- only verifies write attempts and relays them if accepted
- adds reviews to the database by checking every X time the smart contract and adding the reviews that have been accepted (also add reviews when smart contract sends events signalling resolution of a challenge dispute?).
- computes learning path using database data

## Routes

```
/
/resource/cid/addReview
/resource/cid/reviews
/topic/cid (resources)
/path


/topics/471a97f90b5df17b2f4a79d40f5d5d73fd6c46df96b34d2334c68aea90a8494b/resources
```

## TODO
- [x] Schelling game
- [x] Post reviews
- [x] Get learning paths from db
- [ ] Add UI for challenging resources
- [x] Add content
- [x] Add sidebar options
- [x] Add about us section
- [x] Deploy on rinkeby
- [ ] Self-attest

## Bugs

- Not showing Bitcoin Whitepaper when search is done
- Crypto (review for topic??)
- Reviews not being added

## Contracts
Contracts deployed on rinkeby:
- Schelling.sol: 0x05783454aea9ae3d448a0f1e93621d974ff65808
https://rinkeby.etherscan.io/address/0x05783454aea9ae3d448a0f1e93621d974ff65808
- Review controller: 0xcda376b1d49cec896778b7099fb7754bc4bc883f
https://rinkeby.etherscan.io/address/0xcda376b1d49cec896778b7099fb7754bc4bc883f

