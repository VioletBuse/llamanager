import { get_primary_id } from "../../db/index.js"

export const run_worker_manager = () => {
    manage_workers().then(() => {
        setTimeout(run_worker_manager, 1000)
    }).catch(err => {
        throw err
    })
}

const manage_workers = async () => {
    const is_primary = (await get_primary_id()) === process.env.FLY_MACHINE_ID;

    if (!is_primary) {
        return
    }

    console.log(`managing_workers!`)
}
