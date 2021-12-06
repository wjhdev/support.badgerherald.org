<?php


/**
 * Register an oembed for amazon product links
 *
 * Direct link: 
 * https://www.amazon.com/gp/product/1610393384/ref=as_li_qf_asin_il_tl?ie=UTF8&tag=bhaa69-20&creative=9325&linkCode=as2&creativeASIN=1610393384&linkId=4e4341ec2f35d53262da1e82d5b714d0
 */
function bh_support_amazon_inline_embed( $matches, $attr, $url, $rawattr ) {
	return "HELLO AMAZON LINK";
}
wp_embed_register_handler( 'exa-inline-link', '*(?:http|https)://amazon.com/*', 'bh_support_amazon_inline_embed' );

remove_filter('template_redirect','redirect_canonical');

/*

<iframe 

style="width:120px;height:240px;" 
marginwidth="0" 
marginheight="0" 
scrolling="no" 
frameborder="0" 
src="//ws-na.amazon-adsystem.com/widgets/q
?ServiceVersion=20070822
&OneJS=1
&Operation=GetAdHtml
&MarketPlace=US
&source=ac
&ref=qf_sp_asin_til
&ad_type=product_link
&tracking_id=bhaa69-20
&marketplace=amazon
&region=US
&placement=1610393384
&asins=1610393384
&linkId=063d9e74577056c77f3368c6f25fc526
&show_border=false
&link_opens_in_new_window=true
&price_color=333333
&title_color=0066c0
&bg_color=ffffff"></iframe>

    Image-only link (just a larger thumbnail):

<a target="_blank"  href="https://www.amazon.com/gp/product/1610393384/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1610393384&linkCode=as2&tag=bhaa69-20&linkId=74a270e63e29e938b250930c25c4b201"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=1610393384&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=bhaa69-20" ></a><img src="//ir-na.amazon-adsystem.com/e/ir?t=bhaa69-20&l=am2&o=1&a=1610393384" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

*/