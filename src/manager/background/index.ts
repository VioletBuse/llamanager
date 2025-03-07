
export const run_manager_bg = () => {
    manager_background_tasks().then(() => {
        setTimeout(run_manager_bg, 1000)
    }).catch(err => {
        throw err
    })
}

const manager_background_tasks = async () => {
    console.log(`running manager background tasks`)
}
