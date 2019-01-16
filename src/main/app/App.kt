package app

import app.info.InfoGenerator
import kotlin.js.console
import kotlin.browser.document

external fun require(module: String): dynamic

fun main(args: Array<String>) {
    require("../src/css/app.css")

    val infoElement = InfoGenerator.create(false)

    document.body?.appendChild(infoElement)
}
