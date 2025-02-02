import { User } from './no_sql/users.js'
import { Track } from './no_sql/tracks.js'
import { Storage } from './no_sql/storage.js'


export const models = {
    usersModel: User,
    tracksModel: Track,
    storageModel: Storage
}