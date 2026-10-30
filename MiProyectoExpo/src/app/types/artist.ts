export interface Artist {
    id: number
    name: string
    image: string
}
export interface ArtistResorce {
    id: number
    name: string
    mbid: string
    image: [ImageUrl]
}
interface ImageUrl {
    '#text': string
}