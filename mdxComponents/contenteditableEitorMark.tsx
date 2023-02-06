import React, { useRef, useEffect, useState } from "react"
import pinyin from "pinyin"
const reg = /[\u4e00-\u9fa5]/
export default function ContenteditableEitorMark () {
  const editor = useRef<HTMLDivElement>(null)
  const [currenText, setCurrentText] = useState("")
  const [selectNode, setSelectNode] = useState<Node>()
  const [selectStart, setSelectStart] = useState(0)
  const [selectEnd, setSelectEnd] = useState(0)
  const [pinyins, setPinyins] = useState<string[]>([])
  const [pinyinTipsVisible, setPinyinTipsVisible] = useState<boolean>(false)
  useEffect(() => {
    initEvents()
  }, [editor])

  const initEvents = () => {
      editor?.current?.addEventListener("selectionchange", () => {
      const {startOffset, endOffset, collapsed, endContainer, startContainer} = (document.getSelection() as Selection).getRangeAt(0)
      if (collapsed) return
      if (!(endOffset - startOffset === 1 && endContainer === startContainer)) return
      const { commonAncestorContainer } = (document.getSelection() as Selection).getRangeAt(0)
      setSelectNode(commonAncestorContainer)
      const selectTarget = (commonAncestorContainer.nodeValue as string).substring(startOffset, endOffset)
      if (!reg.test(selectTarget)) return
      setCurrentText(selectTarget)
      setSelectStart(startOffset)
      setSelectEnd(endOffset)
      setSelectNode(commonAncestorContainer)
    })
    editor?.current?.addEventListener("click", (e: any) => {
      if (e.target.className.includes("mark")) {
        console.log(1)
      }
    })
  }
  const setPronunciation = () => {
    if (!currenText) return
    const pys = pinyin(currenText, {
      heteronym: true
    })
    setPinyins(pys[0])
    setPinyinTipsVisible(true)
  }
  const setCurrentPinyin = (py: string) => {
    const parentNode: Node = (selectNode as Node).parentNode as Node
    const start = document.createTextNode(((selectNode as Node).nodeValue as string).slice(0, selectStart))
    const current = document.createElement("i")
    current.setAttribute("class", "italic font-bold px-[5px] pointer-events-none")
    current.innerText = currenText
    current.setAttribute("data-mark", `[${py}]`)
    const end = document.createTextNode(((selectNode as Node).nodeValue as string).slice(selectEnd))
    parentNode.insertBefore( start, selectNode as Node)
    parentNode.insertBefore( current, selectNode as Node)
    parentNode.insertBefore( end, selectNode as Node)
    parentNode.removeChild(selectNode as Node)
    setPinyinTipsVisible(false)
    setPinyins([])
  }
  return (
    <div className="w-full h-[600px] flex justify-center items-center">
      <div className="w-full h-full rounded-sm overflow-hidden box-border border-slate-300 border-2 border-solid">
        <div className="w-full h-[100px] box-border flex border-slate-300 border-b-2 border-solid items-center">
          <div className="w-fit text-amber-300 leading-5 text-sm text-center h-[20px] bg-indigo-400 rounded-md select-none cursor-pointer relative" onClick={setPronunciation}>
            多音字
            {
              pinyinTipsVisible ? <div className="absolute flex h-[40px] w-fit bg-white border-slate-300 border-2 overflow-hidden">
                {
                  pinyins.map(py => {
                    return <div key={py} className="overflow-hidden whitespace-nowrap cursor-pointer w-[40px] box-border text-xs text-slate-500" onClick={() => setCurrentPinyin(py)}>{py}</div>
                  })
                }
              </div> : null
            }
          </div>
        </div>
        {/**@ts-ignore */ }
        <div className="w-full h-[calc(100% - 100px)] p-[20px]" contentEditable="plaintext-only" ref={editor} suppressContentEditableWarning="true">
        在这里我其实主张“平等相待，泰然处之”。
        </div>
      </div> 
    </div>
  )
}
