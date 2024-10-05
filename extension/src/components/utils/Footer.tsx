import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare, faCopy} from "@fortawesome/free-solid-svg-icons";
import {toast} from "react-toastify";

function Footer() {

    function copyClipboard(copy: string) {
        navigator.clipboard.writeText(copy)
            .then(() => {
                toast.success(`Copied to clipboard: ${copy}`);
            })
            .catch((error) => {
                toast.error('Failed to copy to clipboard: ' + error);
            });
    }

    return (
        <footer className={"bg-pwdm-two mt-5 py-5 text-pwdm-four"}>
            <h1 className={"text-2xl mb-3"}>Please help the dev :)</h1>
            <div className={"w-11/12 gap-2 mx-auto"}>
                <div className={"text-center"}>
                    <ul className={""}>
                        <li className={""}>
                            <a className={"clickable"} href="https://www.paypal.com/paypalme/QuixoticQC" target="_blank">Paypal
                                <FontAwesomeIcon className={"ms-2"} icon={faArrowUpRightFromSquare}/>
                            </a>
                        </li>
                        <li className={"clickable"}
                            onClick={() => copyClipboard("0x177DA3298468DFBA273ea51c06F308d95045E597")}>Ethereum:
                            <span> 0x177DA3298468DFBA273ea51c06F308d95045E597</span>
                            <FontAwesomeIcon className={"ms-2"} icon={faCopy}/>
                        </li>
                        <li className={"clickable"}
                            onClick={() => copyClipboard("bc1qm7t9gkqml4csh8fa66tl7su8fvtjevy5tujca9")}>Bitcoin:
                            <span> bc1qm7t9gkqml4csh8fa66tl7su8fvtjevy5tujca9</span>
                            <FontAwesomeIcon className={"ms-2"} icon={faCopy}/>
                        </li>
                        <li className={"clickable"}
                            onClick={() => copyClipboard("3z4bqVarj6CiMFJYiCyu4CGqNjQLDGAeQE8PTnSR87wh")}>Solana:
                            <span> 3z4bqVarj6CiMFJYiCyu4CGqNjQLDGAeQE8PTnSR87wh</span>
                            <FontAwesomeIcon className={"ms-2"} icon={faCopy}/>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;