import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare, faCopy} from "@fortawesome/free-solid-svg-icons";
import {toast} from "react-toastify";
import { useMediaQuery } from 'react-responsive';

function Footer() {
    const isLg = useMediaQuery({ query: '(min-width: 1024px)' });
    const isMd = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });

    function copyClipboard(copy: string) {
        navigator.clipboard.writeText(copy)
            .then(() => {
                toast.success(`Copied to clipboard: ${copy}`);
            })
            .catch((error) => {
                toast.error('Failed to copy to clipboard: ' + error);
            });
    }

    function getWallet(address: string) {
        if (isLg || isMd) {
            return address;
        } else {
            return `${address.slice(0, 5)}...${address.slice(-3)}`;
        }
    }

    return (
        <footer className={"bg-pwdm-two mt-5 py-5 text-pwdm-four"}>
            <h1 className={"text-2xl mb-3"}>Please help the dev :)</h1>
            <div className={"grid grid-cols-3 w-11/12 gap-2 mx-auto"}>
                <div className={"text-center"}>
                    <ul className={""}>
                        <li className={""}>
                            <a className={"clickable"} href="https://www.paypal.com/paypalme/QuixoticQC" target="_blank">Paypal
                                <FontAwesomeIcon className={"ms-2"} icon={faArrowUpRightFromSquare}/>
                            </a>
                        </li>
                        <li className={"clickable"}
                            onClick={() => copyClipboard("0x177DA3298468DFBA273ea51c06F308d95045E597")}>Ethereum:
                            <span> {getWallet("0x177DA3298468DFBA273ea51c06F308d95045E597")}</span>
                            <FontAwesomeIcon className={"ms-2"} icon={faCopy}/>
                        </li>
                        <li className={"clickable"}
                            onClick={() => copyClipboard("bc1qm7t9gkqml4csh8fa66tl7su8fvtjevy5tujca9")}>Bitcoin:
                            <span> {getWallet("bc1qm7t9gkqml4csh8fa66tl7su8fvtjevy5tujca9")}</span>
                            <FontAwesomeIcon className={"ms-2"} icon={faCopy}/>
                        </li>
                        <li className={"clickable"}
                            onClick={() => copyClipboard("3z4bqVarj6CiMFJYiCyu4CGqNjQLDGAeQE8PTnSR87wh")}>Solana:
                            <span> {getWallet("3z4bqVarj6CiMFJYiCyu4CGqNjQLDGAeQE8PTnSR87wh")}</span>
                            <FontAwesomeIcon className={"ms-2"} icon={faCopy}/>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;