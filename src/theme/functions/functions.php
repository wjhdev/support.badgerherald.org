<?php

function bhaa_setup()
{
    /* Register different size thumbnail images */
    add_theme_support('post-thumbnails');
    add_theme_support('editor-styles');

    /* Include custom editor styles, so the backend looks like
	 * the front end. */
    add_editor_style('editor-style.css');

    add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'bhaa_setup');

function bhaa_admin_typography()
{
    echo '<link rel="stylesheet" type="text/css" href="https://cloud.typography.com/7844898/6540412/css/fonts.css" />';
}
add_action('admin_head', 'bhaa_admin_typography');

/**
 * Register an oembed for amazon product links
 *
 * Direct link: 
 * https://www.amazon.com/gp/product/1610393384/ref=as_li_qf_asin_il_tl?ie=UTF8&tag=bhaa69-20&creative=9325&linkCode=as2&creativeASIN=1610393384&linkId=4e4341ec2f35d53262da1e82d5b714d0
 */
function bh_support_amazon_inline_embed($matches, $attr, $url, $rawattr)
{
    return "HELLO AMAZON LINK";
}
wp_embed_register_handler('exa-inline-link', '*(?:http|https)://amazon.com/*', 'bh_support_amazon_inline_embed');

remove_filter('template_redirect', 'redirect_canonical');


/**
 * Pre-load menus defined in theme-definition.json
 */
add_filter("webpress_preloaded", function ($array) {
    global $wp;

    $path = $wp->request;

    if ($path) {
        $request['path']  = $path;
        $array["/webpress/v1/template?path=%2F" . $path . "%2F"] = wp_json_encode(webpress_template_request($request));
    } else {
        $request['path']  = "/";
        $array["/webpress/v1/template?path=%2F"] = wp_json_encode(webpress_template_request($request));
    }

    if ($path && $path == "events" || $path == "get-involved") {
        bhaa_preload_page_slug($path, $array);
    }

    $cached_array = [];
    if (!$path || $path == "about" || $path == "updates" || $path == "newsletter" || $path == "store") {
        $cached_array = wp_cache_get('bhaa-index-preload', 'webpress');
        if ($cached_array === false) {
            $cached_array = [];
            bhaa_preload_page_slug("about", $cached_array);
            bhaa_preload_page_slug("updates", $cached_array);
            bhaa_preload_page_slug("newsletter", $cached_array);
            bhaa_preload_page_slug("store", $cached_array);
            bhaa_preload_page(2, $cached_array);
            bhaa_preload_posts($cached_array);
            wp_cache_set('bhaa-index-preload', $cached_array, 'webpress', 60 * 60 * 24 * 7);
        }
    }
    return array_merge($array, $cached_array);
});

function bhaa_preload_posts(&$array)
{
    $key = '/wp/v2/posts';
    $request = new WP_REST_Request('GET', '/wp/v2/posts');
    $response = rest_do_request($request);
    $server = rest_get_server();
    $data = $server->response_to_data($response, false);
    $array[$key] = wp_json_encode($data);
}

function bhaa_preload_page($id, &$array)
{
    $key = "/wp/v2/pages/$id";
    $request = new WP_REST_Request('GET', "/wp/v2/pages/$id");
    $response = rest_do_request($request);
    $server = rest_get_server();
    $data = $server->response_to_data($response, false);
    $array[$key] = wp_json_encode($data);
}

function bhaa_preload_page_slug($slug, &$array)
{
    $key = "/wp/v2/pages?slug=$slug";
    $request = new WP_REST_Request('GET', '/wp/v2/pages');
    $request->set_query_params(['slug' => $slug]);
    $response = rest_do_request($request);
    $server = rest_get_server();
    $data = $server->response_to_data($response, false);

    if ($data[0]["featured_media"] != null && $data[0]["featured_media"]  != 0) {
        bhaa_preload_media($data[0]["featured_media"], $array);
    }

    $array[$key] = wp_json_encode($data);
}
function bhaa_preload_media($id, &$array)
{
    $key = "/wp/v2/media/$id";
    $request = new WP_REST_Request('GET', "/wp/v2/media/$id");
    $response = rest_do_request($request);
    $server = rest_get_server();
    $data = $server->response_to_data($response, false);
    $array[$key] = wp_json_encode($data);
}

function bust_redis_cache_on_database_change()
{
    wp_cache_delete('bhaa-index-preload', 'webpress');
}
add_action('save_post', 'bust_redis_cache_on_database_change');
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