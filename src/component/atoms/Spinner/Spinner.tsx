import {Spin} from 'antd';
import styles from './Spinner.module.css'
import commonStyles from '../../../style/commonStyles.module.css'
import {setClasses} from '../../../util/setClasses'

export const Spinner = <Spin size={'large'}
                             className={setClasses(
                               commonStyles.allScreen,
                               styles.spinner,
                               commonStyles.flexCenter
                             )}/>
