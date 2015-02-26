/**
 * Created by ldp on 2015/2/18.
 */

/*
 计数排序

 计数排序（Counting sort）是一种稳定的线性时间排序算法。计数排序使用一个额外的数组C，其中第i个元素是待排序数组A中值等于i的元素的个数。然后根据数组C来将A中的元素排到正确的位置。

 计数排序的特征

 当输入的元素是n个0到k之间的整数时，它的运行时间是Θ(n + k)。计数排序不是比较排序，排序的速度快于任何比较排序算法。
 由于用来计数的数组C的长度取决于待排序数组中数据的范围（等于待排序数组的最大值与最小值的差加上1），这使得计数排序对于数据范围很大的数组，需要大量时间和内存。例如：计数排序是用来排序0到100之间的数字的最好的算法，但是它不适合按字母顺序排序人名。但是，计数排序可以用在基数排序中的算法来排序数据范围很大的数组。
 通俗地理解，例如有10个年龄不同的人，统计出有8个人的年龄比A小，那A的年龄就排在第9位，用这个方法可以得到其他每个人的位置，也就排好了序。当然，年龄有重复时需要特殊处理（保证稳定性），这就是为什么最后要反向填充目标数组，以及将每个数字的统计减去1的原因。算法的步骤如下：
 1.找出待排序的数组中最大和最小的元素
 2.统计数组中每个值为i的元素出现的次数，存入数组C的第i项
 3.对所有的计数累加（从C中的第一个元素开始，每一项和前一项相加）
 4.反向填充目标数组：将每个元素i放在新数组的第C(i)项，每放一个元素就将C(i)减去1
 
 简要分析：
 1.计数排序仅适合于小范围的数据进行排序
 2.不能对浮点数进行排序
 3.时间复杂度为 O(n)
 4.计数排序是稳定的（排序后值相同的元素相对于原先的位置是不会发生变化的）
 */

function maxElem(arr){
    var max = arr[0];

    for(var i = 1, len = arr.length; i < len; ++i)
        if(max < arr[i]) max = arr[i];

    return max;
}

/**
 *
 * @param {Array} sqList 要排序的数组
 * @param {Number} k 数组中最大的元素值
 * @returns {Array}
 */
function countSort(sqList, k){
    if(k == null) k = maxElem(sqList);
    var len = sqList.length;
    var c = [];
    var b = [];

    // 初始化辅助数组
    for(var i = 0; i <= k; ++i) c[i] = 0;
    // 计数数组A中值等于C数组下标的个数
    for(i = 0; i < len; ++i) c[sqList[i]]++;
    // 计数数组A中值小于等于C数组下标的个数
    for(i = 1; i <= k; ++i) c[i] += c[i - 1];
    for(i = len - 1; i >= 0; --i) {
        b[c[sqList[i]] - 1] = sqList[i];
        --c[sqList[i]];
    }

    for(i = 0; i < len; ++i) sqList[i] = b[i];
}
exports.countSort = countSort;

var arr = [100, 93, 97, 92, 96, 99, 92, 89, 93, 97, 90, 94, 92, 95];
countSort(arr, 100);
console.log(arr + '');


/*
 基数排序

 基数排序（英语：Radix sort）是一种非比较型整数排序算法，其原理是将整数按位数切割成不同的数字，然后按每个位数分别比较。由于整数也可以表达字符串（比如名字或日期）和特定格式的浮点数，所以基数排序也不是只能使用于整数。基数排序的发明可以追溯到1887年赫尔曼·何乐礼在打孔卡片制表机（Tabulation Machine）上的贡献。
 它是这样实现的：将所有待比较数值（正整数）统一为同样的数位长度，数位较短的数前面补零。然后，从最低位开始，依次进行一次排序。这样从最低位排序一直到最高位排序完成以后，数列就变成一个有序序列。
 基数排序的方式可以采用LSD（Least significant digital）或MSD（Most significant digital），LSD的排序方式由键值的最右边开始，而MSD则相反，由键值的最左边开始。

 效率

 基数排序的时间复杂度是O(k·n)，其中n是排序元素个数，k是数字位数。注意这不是说这个时间复杂度一定优于O(n·log(n))，k的大小取决于数字位的选择（比如比特位数），和待排序数据所属数据类型的全集的大小；k决定了进行多少轮处理，而n是每轮处理的操作数目。
 以排序n个不同整数来举例，假定这些整数以B为底，这样每位数都有B个不同的数字，k = logB(N)，N是待排序数据类型全集的势。虽然有B个不同的数字，需要B个不同的桶，但在每一轮处理中，判断每个待排序数据项只需要一次计算确定对应数位的值，因此在每一轮处理的时候都需要平均n次操作来把整数放到合适的桶中去，所以就有：
 k约等于logB(N)
 所以，基数排序的平均时间T就是：
 T～= logB(N)·n
 其中前一项是一个与输入数据无关的常数，当然该项不一定小于logn
 如果考虑和比较排序进行对照，基数排序的形式复杂度虽然不一定更小，但由于不进行比较，因此其基本操作的代价较小，而且在适当选择的B之下，k一般不大于logn，所以基数排序一般要快过基于比较的排序，比如快速排序。

 假设我们有一些二元组(a,b)，要对它们进行以a为首要关键字，b的次要关键字的排序。我们可以先把它们先按照首要关键字排序，分成首要关键字相同的若干堆。然后，在按照次要关键值分别对每一堆进行单独排序。最后再把这些堆串连到一起，使首要关键字较小的一堆排在上面。按这种方式的基数排序称为MSD(Most Significant Dight)排序。第二种方式是从最低有效关键字开始排序，称为LSD(Least Significant Dight)排序。首先对所有的数据按照次要关键字排序，然后对所有的数据按照首要关键字排序。要注意的是，使用的排序算法必须是稳定的，否则就会取消前一次排序的结果。由于不需要分堆对每堆单独排序，LSD方法往往比MSD简单而开销小。下文介绍的方法全部是基于LSD的。

 基数排序的简单描述就是将数字拆分为个位十位百位，每个位依次排序。因为这对算法稳定要求高，所以我们对数位排序用到上一个排序方法计数排序。因为基数排序要经过d (数据长度)次排序， 每次使用计数排序， 计数排序的复杂度为 On),  d 相当于常量和N无关，所以基数排序也是 O(n)。基数排序虽然是线性复杂度， 即对n个数字处理了n次，但是每一次代价都比较高， 而且使用计数排序的基数排序不能进行原地排序，需要更多的内存， 并且快速排序可能更好地利用硬件的缓存， 所以比较起来，像快速排序这些原地排序算法更可取。对于一个位数有限的十进制数，我们可以把它看作一个多元组，从高位到低位关键字重要程度依次递减。可以使用基数排序对一些位数有限的十进制数排序。
 */

// 求数据的最大位数
function maxBit(arr){
    var d = 1;
    var p = 10;

    for(var i = 0, n = arr.length; i < n; ++i){
        while(arr[i] >= p){
            p *= 10;
            ++d;
        }
    }

    return d;
}

function radixSort(arr, d){
    d = d || maxBit(arr);
    var n = arr.length;
    var temp = [];
    // 计数器
    var count = [];
    var radix = 1;

    // 进行d次排序
    for(var i = 1; i <= d; ++i){
        // 每次分配前清空计数器
        for(var j = 0; j < 10; ++j)
            count[j] = 0;
        // 统计每个桶中的记录数
        for(j = 0; j < n; ++j){
            var k = (arr[j] / radix | 0) % 10;
            ++count[k];
        }
        for(j = 1; j < 10; ++j)
            count[j] += count[j - 1];
        // 将所有桶中记录依次收集到tmp中
        for(j = n - 1; j >= 0; --j){
            k = (arr[j] / radix | 0) % 10;
            temp[--count[k]] = arr[j];
        }
        //将临时数组的内容复制到arr中
        for(j = 0; j < n; ++j)
            arr[j] = temp[j];

        radix *= 10;
    }
}
exports.radixSort = radixSort;

var arr = [100, 93, 97, 92, 96, 99, 92, 89, 93, 97, 90, 94, 92, 95];
radixSort(arr, 100);
console.log(arr + '');



/*
 桶排序

 桶排序（Bucket sort）或所谓的箱排序，是一个排序算法，工作的原理是将数组分到有限数量的桶子里。每个桶子再个别排序（有可能再使用别的排序算法或是以递归方式继续使用桶排序进行排序）。桶排序是鸽巢排序的一种归纳结果。当要被排序的数组内的数值是均匀分配的时候，桶排序使用线性时间（Θ(n)）。但桶排序并不是比较排序，他不受到O(n log n)下限的影响。

 基本思想

 假设有一组长度为N的待排关键字序列K[1....n]。首先将这个序列划分成M个的子区间(桶) 。然后基于某种映射函数 ，将待排序列的关键字k映射到第i个桶中(即桶数组B的下标 i) ，那么该关键字k就作为B[i]中的元素(每个桶B[i]都是一组大小为N/M的序列)。接着对每个桶B[i]中的所有元素进行比较排序(可以使用快排)。然后依次枚举输出B[0]....B[M]中的全部内容即是一个有序序列。
 假如待排序列K= {49、 38 、 35、 97 、 76、 73 、 27、 49 }。这些数据全部在1—100之间。因此我们定制10个桶，然后确定映射函数f(k)=k/10。则第一个关键字49将定位到第4个桶中(49/10=4)。依次将所有关键字全部堆入桶中，并在每个非空的桶中进行快速排序。

 分析

 桶排序利用函数的映射关系，减少了几乎所有的比较工作。实际上，桶排序的f(k)值的计算，其作用就相当于快排中划分，已经把大量数据分割成了基本有序的数据块(桶)。然后只需要对桶中的少量数据做先进的比较排序即可。
 对N个关键字进行桶排序的时间复杂度分为两个部分：
     (1) 循环计算每个关键字的桶映射函数，这个时间复杂度是O(N)。
     (2) 利用先进的比较排序算法对每个桶内的所有数据进行排序，其时间复杂度为 ∑ O(Ni*logNi) 。其中Ni 为第i个桶的数据量。
 很显然，第(2)部分是桶排序性能好坏的决定因素。尽量减少桶内数据的数量是提高效率的唯一办法(因为基于比较排序的最好平均时间复杂度只能达到O(N*logN)了)。因此，我们需要尽量做到下面两点：
     (1) 映射函数f(k)能够将N个数据平均的分配到M个桶中，这样每个桶就有[N/M]个数据量。
     (2) 尽量的增大桶的数量。极限情况下每个桶只能得到一个数据，这样就完全避开了桶内数据的“比较”排序操作。 当然，做到这一点很不容易，数据量巨大的情况下，f(k)函数会使得桶集合的数量巨大，空间浪费严重。这就是一个时间代价和空间代价的权衡问题了。

 对于N个待排数据，M个桶，平均每个桶[N/M]个数据的桶排序平均时间复杂度为：
 O(N)+O(M*(N/M)*log(N/M))=O(N+N*(logN-logM))=O(N+N*logN-N*logM)
 当N=M时，即极限情况下每个桶只有一个数据时。桶排序的最好效率能够达到O(N)。

 总结： 桶排序的平均时间复杂度为线性的O(N+C)，其中C=N*(logN-logM)。如果相对于同样的N，桶数量M越大，其效率越高，最好的时间复杂度达到O(N)。 当然桶排序的空间复杂度 为O(N+M)，如果输入数据非常庞大，而桶的数量也非常多，则空间代价无疑是昂贵的。此外，桶排序是稳定的。
 */

var BUCKETSNUM = 10;
var quickSort = require('../exchange/exchange-sort').quickSort;

function bucketSort(sqList){
    var  n = sqList.length;
    var bucketA = [];
    var b = [];

    // 初始化桶
    for(var i = 0; i < BUCKETSNUM; ++i){
        b[i] = [];
        bucketA[i] = 0;

        for(var j = 0; j < n; ++j)
            b[i][j] = Infinity;
    }

    // 给桶填装数据
    for(i = 0; i < n; ++i){
        var data = sqList[i];
        // noto: 这里的映射函数是针对1-100之间的实数
        var bucket = data / BUCKETSNUM | 0;
        b[bucket][bucketA[bucket]] = data;
        ++bucketA[bucket];
    }

    // 针对每个桶进行快速排序
    for(i = 0; i < BUCKETSNUM; ++i){
        if(bucketA[i] !== 0) {
            quickSort(b[i], 0, bucketA[i] - 1);
            //for(j = 1; j < bucketA[i]; ++j){
            //    var p = b[i][j];
            //    for(var k = j - 1; k >= 0 && p < b[i][k]; --k){
            //        b[i][k + 1] = b[i][k];
            //    }
            //    b[i][k + 1] = p;
            //}
        }
    }

    //console.log(b);
    //console.log(bucketA);

    // 复制回去
    var num = 0;
    for(i = 0; i < BUCKETSNUM; ++i){
        if(bucketA[i] !== 0) {
            for(j = 0; j < bucketA[i]; ++j){
                sqList[num++] = b[i][j];
            }
        }
    }
}
exports.bucketSort = bucketSort;

var arr = [51.2, 93, 1, 92.2, 8, 99.5, 92.0, 89, 93, 97, 90, 94, 92.1, 95];
bucketSort(arr);
console.log(arr + '');

var arr = [51.2, 93, 1, 92.2, 8, 99.5, 92.0, 89, 93, 97, 90, 94, 92.1, 95, Infinity, Infinity, Infinity];
quickSort(arr);
console.log(arr + '');


/*
 性能分析
 很明显，基数排序的性能比桶排序要略差。每一次关键字的桶分配都需要O(N)的时间复杂度，而且分配之后得到新的关键字序列又需要O(N)的时间复杂度。假如待排数据可以分为d个关键字，则基数排序的时间复杂度将是O(d*2N) ，当然d要远远小于N，因此基本上还是线性级别的。基数排序的空间复杂度为O(N+M)，其中M为桶的数量。一般来说N>>M，因此额外空间需要大概N个左右。
 但是，对比桶排序，基数排序每次需要的桶的数量并不多。而且基数排序几乎不需要任何“比较”操作，而桶排序在桶相对较少的情况下，桶内多个数据必须进行基于比较操作的排序。因此，在实际应用中，基数排序的应用范围更加广泛。
 */